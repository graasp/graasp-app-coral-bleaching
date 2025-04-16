import React from 'react';

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
const INIT_CURRENT_TEMPERATURE = 296;

export const useCurrentTemperature = () => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['temperature'],
    initialData: INIT_CURRENT_TEMPERATURE,
  });
  return value;
};
export const useUpdateCurrentTemperature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: (newTemperature: number) => {
      queryClient.setQueryData(['temperature'], newTemperature);
    },
  });
};

export const useView = () => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['view'],
    initialData: View.Macro,
  });
  return value;
};
export const useSetView = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: (view: string) => {
      queryClient.setQueryData(['view'], view);
    },
  });
};

export const useStageDimensions = ({ select = undefined } = {}) => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['stageDimensions'],
    initialData: { width: window?.innerWidth, height: window?.innerHeight },
    select,
  });
  return value;
};
export const useGrowthScale = () => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['growthScale'],
  });
  return value;
};
export const useKelpAmount = () => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['kelpAmount'],
  });
  return value;
};
export const useIsDead = () => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['isDead'],
  });
  return value;
};

export const useSetKelpAmount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: () => {
      const currentTemperature = queryClient.getQueryData<number>([
        'temperature',
      ]);
      const isDead = queryClient.getQueryData<number>(['isDead']);

      const init =
        queryClient.getQueryData<number>(['kelpAmount']) ?? INIT_KELP_AMOUNT;

      if (!isDead) {
        const kelpAmount = Math.max(
          0,
          Math.min(
            currentTemperature < 290 || currentTemperature > 310
              ? init - 5
              : init + 5,
            100,
          ),
        );

        queryClient.setQueryData(['kelpAmount'], kelpAmount);

        queryClient.setQueryData(
          ['growthScale'],
          Math.max(
            queryClient.getQueryData(['growthScale']) ?? INIT_GROWTH_SCALE,
            kelpAmount,
          ),
        );

        if (kelpAmount === 0) {
          queryClient.setQueryData(['isDead'], true);
        }
      }
    },
  });
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
    },
  });
};

export const useSetAnimation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: (value: boolean) => {
      queryClient.setQueryData(['animation'], value);
    },
  });
};

export const useAnimation = () => {
  const value = useQuery({
    // queryFn: () => {},
    queryKey: ['animation'],
    initialData: true,
  });
  return value;
};
