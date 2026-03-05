import groupby from 'lodash.groupby';

import {
  Log,
  useDeathHistory,
  useTemperatureHistory,
  useTime,
} from '@/utils/hooks';

// log containing dead coral name
type LogWithDeaths = Log & { names?: string[]; death?: number };

export const useMergedLogs = ({
  interval,
}: {
  interval?: number;
} = {}): LogWithDeaths[] => {
  const { data: log } = useTemperatureHistory();
  const { data: deathLog } = useDeathHistory();
  const { data: time } = useTime();

  const deathTimeNames = groupby(deathLog, (dt) => dt.name);
  const deathTimes = Object.entries(deathTimeNames).map(([_k, v]) => v[0]);

  const slicedData = log
    .filter(({ t: value }) =>
      interval ? value > Math.max(time - interval, 0) : true,
    )
    .map((l) => {
      const logs = deathTimes.filter((t) => t.t === l.t);
      if (logs.length) {
        // set data for death indications
        return {
          ...l,
          // used for label
          names: logs.map((thisLog) => thisLog.name),
          // position to show in the graph
          death: l.temp,
        };
      }
      return l;
    });

  // @ts-expect-error
  return slicedData;
};
