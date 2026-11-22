/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  INIT_CURRENT_TEMPERATURE,
  INIT_GROWTH_SCALE,
  INIT_KELP_AMOUNT,
  MACRO_GROWTH_SPEED_FACTOR,
  MAX_TEMP_GROWTH,
  MIN_TEMP_GROWTH,
  TIME_SPEED,
} from '@/config/constants';
import { View } from '@/config/types';

const KEYS = {
  currentTemperature: ['currentTemperature'],
  time: ['time'],
  context: ['context'],
  kelpAmount: ['kelpAmount'],
  temperatureHistory: ['temperatureHistory'],
  animation: ['animation'],
  deathHistory: ['deathHistory'],
};

type Context = {
  view: View;
  reset: number;
  showStatus: boolean;
  debug: boolean;
};

export type Log = { t: number; name: string };

const DEFAULT_CONTEXT = {
  view: View.Macro,
  showStatus: false,
  debug: false,
  // changes on this value trigger reset
  reset: 0,
};

export const useContext = () => {
  const queryClient = useQueryClient();
  const value = useQuery({
    queryKey: KEYS.context,
    queryFn: () =>
      queryClient.getQueryData<Context>(KEYS.context) ?? DEFAULT_CONTEXT,
    initialData: DEFAULT_CONTEXT,
  });
  return value;
};

export const useTime = () => {
  const queryClient = useQueryClient();
  const value = useQuery({
    queryKey: KEYS.time,
    queryFn: () => queryClient.getQueryData<number>(KEYS.time) ?? 0,
    initialData: 0,
  });
  return value;
};

export const useUpdateTime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (timeIncrement: number = TIME_SPEED) => {
      const newTime = queryClient.getQueryData<number>(KEYS.time) ?? 0;
      const currentTemperature =
        queryClient.getQueryData<number>(KEYS.currentTemperature) ?? 0;

      const tickCount = Math.max(1, Math.round(timeIncrement / TIME_SPEED));

      queryClient.setQueryData<number>(KEYS.time, newTime + timeIncrement);

      // Save every continuous time tick so graph and coral animations receive
      // the same temperature samples as continuous playback.
      queryClient.setQueryData<{ t: number; temp: number }[]>(
        KEYS.temperatureHistory,
        (history) => {
          const entries = Array.from({ length: tickCount }, (_, index) => ({
            t: newTime + index * TIME_SPEED,
            temp: currentTemperature,
          }));
          const endTime = newTime + timeIncrement;
          if (!entries.some(({ t }) => Math.abs(t - endTime) < 0.0001)) {
            entries.push({ t: endTime, temp: currentTemperature });
          }
          return (history ?? []).concat(entries);
        },
      );
    },
  });
};
export const useTemperatureHistory = () => {
  const queryClient = useQueryClient();
  const value = useQuery({
    queryKey: KEYS.temperatureHistory,
    queryFn: () =>
      queryClient.getQueryData<{ t: number; temp: number }[]>(
        KEYS.temperatureHistory,
      ) ?? [],
    initialData: [],
  });
  return value;
};

export const useDeathHistory = () => {
  const queryClient = useQueryClient();
  const value = useQuery({
    queryKey: KEYS.deathHistory,
    queryFn: () => queryClient.getQueryData<Log[]>(KEYS.deathHistory) ?? [],
    initialData: [],
  });
  return value;
};

export const useCurrentTemperature = () => {
  const queryClient = useQueryClient();
  const value = useQuery({
    queryKey: KEYS.currentTemperature,
    queryFn: () =>
      queryClient.getQueryData<number>(KEYS.currentTemperature) ??
      INIT_CURRENT_TEMPERATURE,
    initialData: INIT_CURRENT_TEMPERATURE,
  });
  return value;
};

export const getHumanReadableTemperature = (temperature: number) =>
  Math.round(temperature * 10) / 10;

export const useUpdateCurrentTemperature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTemperature: number) => {
      queryClient.setQueryData(KEYS.currentTemperature, newTemperature);
    },
  });
};

export const useSetView = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (view: View) => {
      queryClient.setQueryData<Context>(['context'], (d) => ({
        ...(d ?? DEFAULT_CONTEXT),
        view,
      }));
    },
  });
};

export const useSetShowStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: boolean) => {
      queryClient.setQueryData<Context>(['context'], (d) => ({
        ...(d ?? DEFAULT_CONTEXT),
        showStatus: value,
      }));
    },
  });
};

export const useStageDimensions = ({ select = undefined } = {}) => {
  const queryClient = useQueryClient();
  const defaultData = {
    width: window?.innerWidth,
    height: window?.innerHeight,
  };
  const value = useQuery({
    queryKey: ['stageDimensions'],
    queryFn: () =>
      queryClient.getQueryData<{ height: number; width: number }>([
        'stageDimensions',
      ]) ?? defaultData,
    select,
    initialData: defaultData,
  });
  return value;
};

export const useSetStageDimensions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dimensions: { height: number; width: number }) => {
      queryClient.setQueryData(['stageDimensions'], dimensions);
    },
  });
};

export enum CoralStatus {
  Growing = 'growing',
  Normal = 'normal',
  Dying = 'dying',
  Dead = 'dead',
}

export const useStatus = (
  coralId: string,
  {
    deathSpeed = 1.2,
    initialKelpAmount = INIT_KELP_AMOUNT,
    growthSpeed = 0.7,
    maxTempThreshold = MAX_TEMP_GROWTH,
  } = {},
): {
  kelpAmount: number;
  status: CoralStatus;
  dyingFactor: number;
} => {
  const { data: time } = useTime();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(CoralStatus.Normal);
  const { data: currentTemperature } = useCurrentTemperature();
  const { mutate: updateTemperature } = useUpdateCurrentTemperature();
  // todo: could use ref?
  const { data } = useContext();
  const [dyingFactor, setDyingFactor] = useState(0);
  const [kelpAmount, setKelpAmount] = useState(initialKelpAmount);

  const reset = data?.reset;
  const humanReadableTemperature = getHumanReadableTemperature(
    currentTemperature ?? 0,
  );

  const isDying =
    humanReadableTemperature <= MIN_TEMP_GROWTH ||
    humanReadableTemperature >= maxTempThreshold;

  const isGrowing =
    humanReadableTemperature > MIN_TEMP_GROWTH &&
    humanReadableTemperature < maxTempThreshold - 1;
  const effectiveGrowthSpeed =
    data.view === View.Macro
      ? growthSpeed * MACRO_GROWTH_SPEED_FACTOR
      : growthSpeed;

  const previousTimeRef = useRef(time);

  useEffect(() => {
    if (reset) {
      setStatus(CoralStatus.Normal);
      setDyingFactor(0);
      setKelpAmount(initialKelpAmount);
      updateTemperature(INIT_CURRENT_TEMPERATURE);
    }
  }, [initialKelpAmount, reset, updateTemperature]);

  // Update the kelp and status together so both use the same value for this
  // time step. Keeping these in separate effects can observe a stale kelp
  // value and record a death before it actually happened.
  useEffect(() => {
    if (time === 0) {
      previousTimeRef.current = 0;
      setStatus(CoralStatus.Normal);
      setDyingFactor(0);
      setKelpAmount(initialKelpAmount);
      return;
    }

    if (status === CoralStatus.Dead) {
      previousTimeRef.current = time;
      return;
    }

    const previousTime = previousTimeRef.current;
    const elapsed = Math.max(0, time - previousTime);
    const tickCount = Math.max(1, Math.round(elapsed / TIME_SPEED));
    const tickLength = elapsed / tickCount;

    previousTimeRef.current = time;

    let nextKelpAmount = kelpAmount;
    let nextStatus: CoralStatus = status;
    let nextDyingFactor = dyingFactor;

    for (let tick = 0; tick < tickCount; tick += 1) {
      if (isGrowing) {
        nextKelpAmount += effectiveGrowthSpeed;
      }
      if (isDying) {
        nextKelpAmount -= deathSpeed;
      }
      nextKelpAmount = Math.max(0, Math.min(nextKelpAmount, 100));

      switch (nextStatus) {
        case CoralStatus.Growing:
          if (isDying) {
            nextStatus = CoralStatus.Dying;
          } else if (!isGrowing) {
            nextStatus = CoralStatus.Normal;
          }
          break;
        case CoralStatus.Normal:
          if (isDying) {
            nextStatus = CoralStatus.Dying;
          } else if (isGrowing) {
            nextStatus = CoralStatus.Growing;
          } else {
            nextDyingFactor = Math.max(nextDyingFactor - TIME_SPEED, 0);
          }
          break;
        case CoralStatus.Dying:
          if (!isDying) {
            nextStatus = CoralStatus.Normal;
          } else if (nextKelpAmount <= 0) {
            nextStatus = CoralStatus.Dead;
            const tickTime = previousTime + tickLength * (tick + 1);
            console.debug(coralId, 'is dead');

            queryClient.setQueryData<{ t: number; name: string }[]>(
              KEYS.deathHistory,
              (deathHistory) => {
                const history = deathHistory ?? [];
                if (history.some(({ name }) => name === coralId)) {
                  return history;
                }
                return history.concat([{ t: tickTime, name: coralId }]);
              },
            );
          }
          break;
        default:
          break;
      }

      if (nextStatus === CoralStatus.Dead) {
        break;
      }
    }

    setKelpAmount(nextKelpAmount);
    setStatus(nextStatus);
    setDyingFactor(nextDyingFactor);
    // This effect advances for both continuous and fast-forward time updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return { kelpAmount, status, dyingFactor };
};

export const useReset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: () => {
      queryClient.setQueryData(
        KEYS.currentTemperature,
        INIT_CURRENT_TEMPERATURE,
      );
      queryClient.setQueryData(KEYS.kelpAmount, INIT_KELP_AMOUNT);
      queryClient.setQueryData(['growthScale'], INIT_GROWTH_SCALE);
      queryClient.setQueryData(['animation'], false);
      queryClient.setQueryData(['isDead'], false);
      queryClient.setQueryData(KEYS.temperatureHistory, []);
      queryClient.setQueryData(KEYS.deathHistory, []);
      queryClient.setQueryData(KEYS.time, 0);
      queryClient.setQueryData<Context>(KEYS.context, (d) => ({
        ...(d ?? DEFAULT_CONTEXT),
        reset: (d?.reset ?? 0) + 1,
      }));
    },
  });
};

export const useSetAnimation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: boolean) => {
      queryClient.setQueryData(['animation'], value);
    },
  });
};

export const useAnimation = () => {
  const queryClient = useQueryClient();
  const value = useQuery({
    queryKey: KEYS.animation,
    queryFn: () => queryClient.getQueryData<boolean>(KEYS.animation),
    initialData: false,
  });
  return value;
};

export const useMaxValue = (
  initialValue: number,
  newValue: number,
): [number, (value: number) => void] => {
  const [max, setMax] = useState(initialValue);

  useEffect(() => {
    if (newValue > max) {
      setMax(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValue]);

  return [max, setMax];
};
