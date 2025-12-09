/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';

import { setContext } from '@sentry/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { use } from 'chai';

import {
  INIT_CURRENT_TEMPERATURE,
  INIT_GROWTH_SCALE,
  INIT_KELP_AMOUNT,
  KELP_SPEED,
  MAX_TEMP_GROWTH,
  MIN_TEMP_GROWTH,
  TIME_SPEED,
} from '@/config/constants';
import { View } from '@/config/types';

export type UpdateArgument<T extends object> =
  | T
  | ((previousArg: T) => Partial<T>);

/* istanbul ignore next */
export function useObjectState<T extends object>(
  initialValue: T,
): [T, (arg: UpdateArgument<T>) => void] {
  const [state, setState] = React.useState(initialValue);

  const handleUpdate = React.useCallback((arg: UpdateArgument<T>) => {
    if (typeof arg === 'function') {
      setState((s) => {
        const newState = arg(s);

        return { ...s, ...newState };
      });
    }

    if (typeof arg === 'object') {
      setState((s) => ({ ...s, ...arg }));
    }
  }, []);

  return [state, handleUpdate];
}

const KEYS = {
  currentTemperature: ['currentTemperature'],
  time: ['time'],
  context: ['context'],
  kelpAmount: ['kelpAmount'],
  temperatureHistory: ['temperatureHistory'],
  animation: ['animation'],
};

type Context = { view: View; reset: number };

export const useContext = () => {
  const queryClient = useQueryClient();
  const value = useQuery({
    queryKey: KEYS.context,
    queryFn: () =>
      queryClient.getQueryData<{
        view: View;
        reset: number;
        showStatus: boolean;
      }>(KEYS.context),
    initialData: { view: View.Macro, reset: 0, showStatus: false },
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
    mutationFn: async () => {
      const newTime = queryClient.getQueryData<number>(KEYS.time) ?? 0;
      const currentTemperature =
        queryClient.getQueryData<number>(KEYS.currentTemperature) ?? 0;

      queryClient.setQueryData<number>(KEYS.time, newTime + TIME_SPEED);

      // save current temperature at point of time
      queryClient.setQueryData<{ t: number; temp: number }[]>(
        KEYS.temperatureHistory,
        (d) => d?.concat([{ t: newTime, temp: currentTemperature }]),
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
        ...(d ?? { reset: 0, view }),
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
        ...d,
        showStatus: value,
      }));
    },
  });
};

export const useStageDimensions = ({ select = undefined } = {}) => {
  const queryClient = useQueryClient();
  const value = useQuery({
    queryKey: ['stageDimensions'],
    queryFn: () =>
      queryClient.getQueryData<{ height: number; width: number }>([
        'stageDimensions',
      ]),
    select,
    initialData: {
      width: window?.innerWidth,
      height: window?.innerHeight,
    },
  });
  return value;
};

export const useGrowthScale = () => {
  const value = useQuery<number>({
    // queryFn: () => {},
    queryKey: ['growthScale'],
  });
  return value;
};
export const useKelpAmount = () => {
  const queryClient = useQueryClient();
  const value = useQuery<number>({
    queryKey: KEYS.kelpAmount,
    queryFn: () =>
      queryClient.getQueryData(KEYS.kelpAmount) ?? INIT_KELP_AMOUNT,
  });
  return value;
};
export const useIsDead = () => {
  const value = useQuery<boolean>({
    queryKey: ['isDead'],
    initialData: false,
  });
  return value;
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
    maxTempThreshould = MAX_TEMP_GROWTH,
  } = {},
): {
  kelpAmount: number;
  status: CoralStatus;
  dyingFactor: number;
} => {
  const queryClient = useQueryClient();
  const { data: time } = useTime();

  const [status, setStatus] = useState(CoralStatus.Normal);
  const { data: currentTemperature } = useCurrentTemperature();
  const { mutate: updateTemperature } = useUpdateCurrentTemperature();
  // todo: could use ref?
  const { data } = useContext();
  const [dyingFactor, setDyingFactor] = useState(0);
  const [kelpAmount, setKelpAmount] = useState(initialKelpAmount);

  const reset = data?.reset;

  const isDying =
    currentTemperature <= MIN_TEMP_GROWTH ||
    currentTemperature >= maxTempThreshould;

  const isGrowing =
    currentTemperature > MIN_TEMP_GROWTH &&
    currentTemperature < maxTempThreshould - 1;

  useEffect(() => {
    if (reset) {
      setStatus(CoralStatus.Normal);
      setDyingFactor(0);
      setKelpAmount(initialKelpAmount);
      updateTemperature(INIT_CURRENT_TEMPERATURE);
    }
  }, [reset]);

  // update kelp value
  useEffect(() => {
    // reset
    if (time === 0) {
      setStatus(CoralStatus.Normal);
      setDyingFactor(0);
      setKelpAmount(initialKelpAmount);
    }
    // non-dead coral
    else if (status !== CoralStatus.Dead && currentTemperature) {
      let value = kelpAmount;
      if (isGrowing) {
        value = kelpAmount + growthSpeed;
      }
      if (isDying) {
        value = kelpAmount - deathSpeed;
      }
      const newValue = Math.max(0, Math.min(value, 100));
      setKelpAmount(newValue);
    }
  }, [time]);

  // state machine per status
  useEffect(() => {
    if (status !== CoralStatus.Dead) {
      switch (status) {
        case CoralStatus.Growing:
          if (!isGrowing) {
            setStatus(CoralStatus.Normal);
          }
          break;
        case CoralStatus.Normal:
          if (isDying) {
            setStatus(CoralStatus.Dying);
          } else if (isGrowing) {
            setStatus(CoralStatus.Growing);
          } else {
            setDyingFactor((d) => Math.max(d - TIME_SPEED, 0));
          }
          break;
        case CoralStatus.Dying:
          if (!isDying) {
            setStatus(CoralStatus.Normal);
          } else if (kelpAmount <= 0) {
            setStatus(CoralStatus.Dead);
            console.log(coralId, 'is dead');

            // } else {
            //   setDyingFactor((d) => d + TIME_SPEED * deathSpeed);
          }
          break;
        case CoralStatus.Dead:
          // setKelpAmount(0);
          break;
        default:
          break;
      }
    }
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
      queryClient.setQueryData(KEYS.time, 0);
      queryClient.setQueryData<Context>(KEYS.context, (d) => ({
        ...(d ?? { reset: 0, view: View.Micro }),
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

export const useMaxValue = (initialValue, newValue) => {
  const [max, setMax] = useState(initialValue);

  // prevent shrinking
  useEffect(() => {
    if (newValue > max) {
      setMax(newValue);
    }
  }, [newValue]);

  return [max, setMax];
};
