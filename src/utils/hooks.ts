/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

const INIT_KELP_AMOUNT = 50;
const INIT_GROWTH_SCALE = 50;
const INIT_CURRENT_TEMPERATURE = 300.1;

export const useTime = () => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['time'],
    initialData: 0,
  });
  return value;
};
export const useUpdateTime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      queryClient.setQueryData<number>(['time'], (t) => (t ?? 0) + 1);
    },
  });
};

export const useCurrentTemperature = () => {
  const value = useQuery({
    queryKey: ['temperature'],
    initialData: INIT_CURRENT_TEMPERATURE,
  });
  return value;
};
export const useUpdateCurrentTemperature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTemperature) => {
      // do nothing
      queryClient.setQueryData(['temperature'], newTemperature);
    },
  });
};

type Context = { view: View; reset: number };

export const useContext = () => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['context'],
    initialData: { view: View.Macro, reset: 0 },
  });
  return value;
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

export const useStageDimensions = ({ select = undefined } = {}) => {
  const value = useQuery({
    queryKey: ['stageDimensions'],
    initialData: { width: window?.innerWidth, height: window?.innerHeight },
    select,
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
  const value = useQuery<number>({
    // queryFn: () => {},
    queryKey: ['kelpAmount'],
    initialData: INIT_KELP_AMOUNT,
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

const SPEED = 0.5;

export enum CoralStatus {
  Normal = 'normal',
  Dying = 'dying',
  Dead = 'dead',
}

export const useStatus = (
  coralId: string,
  { deathSpeed = 5, initialKelpAmount = INIT_KELP_AMOUNT } = {},
): { kelpAmount: number; status: CoralStatus } => {
  const { data: time } = useTime();

  const [status, setStatus] = useState(CoralStatus.Normal);
  const { data: currentTemperature } = useCurrentTemperature();
  // todo: could use ref?
  const { data } = useContext();
  const [dyingFactor, setDyingFactor] = useState(0);
  const [kelpAmount, setKelpAmount] = useState(initialKelpAmount);

  const reset = data?.reset;

  useEffect(() => {
    if (reset) {
      setStatus(CoralStatus.Normal);
      setDyingFactor(0);
      setKelpAmount(initialKelpAmount);
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
      const newValue = Math.max(
        0,
        Math.min(
          currentTemperature < 296.15 || currentTemperature > 302.15
            ? kelpAmount - deathSpeed
            : kelpAmount + SPEED,
          150,
        ),
      );
      setKelpAmount(newValue);
    }
  }, [time]);

  // state machine per status
  useEffect(() => {
    switch (status) {
      case CoralStatus.Normal:
        if (kelpAmount < 40) {
          setStatus(CoralStatus.Dying);
        } else {
          setDyingFactor(0);
        }
        break;
      case CoralStatus.Dying:
        if (kelpAmount > 40) {
          setStatus(CoralStatus.Normal);
        }
        if (dyingFactor > 7) {
          setStatus(CoralStatus.Dead);
        } else {
          setDyingFactor((d) => d + 1);
        }
        break;
      case CoralStatus.Dead:
        setKelpAmount(0);
        break;
      default:
        break;
    }
  }, [time, kelpAmount, status]);

  return { kelpAmount, status };
};

export const useReset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: () => {
      queryClient.setQueryData(
        ['currentTemperature'],
        INIT_CURRENT_TEMPERATURE,
      );
      queryClient.setQueryData(['kelpAmount'], INIT_KELP_AMOUNT);
      queryClient.setQueryData(['growthScale'], INIT_GROWTH_SCALE);
      queryClient.setQueryData(['animation'], false);
      queryClient.setQueryData(['isDead'], false);
      queryClient.setQueryData(['time'], 0);
      queryClient.setQueryData<Context>(['context'], (d) => ({
        ...(d ?? { reset: 0, view: View.Macro }),
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
  const value = useQuery({
    queryKey: ['animation'],
    initialData: false,
  });
  return value;
};
