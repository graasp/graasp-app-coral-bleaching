import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTime } from '@/utils/hooks';

import { Tooltip as CustomTooltip } from './Tooltip';
import { useMergedLogs } from './useMergedLogs';

const DAY_INTERVAL = 20;
const controlsWidth = 150;

// eslint-disable-next-line react/function-component-definition
export function DayGraph(): JSX.Element {
  const { data: time } = useTime();
  const { t } = useTranslation();
  const log = useMergedLogs({ interval: DAY_INTERVAL });

  return (
    <AreaChart
      // minus padding, minus controls width
      width={window.innerWidth - 100 - controlsWidth}
      height={150}
      data={log}
      margin={{ right: 20, bottom: 5 }}
      style={{
        borderRadius: 30,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Area
        type="monotone"
        dataKey="temp"
        stroke="#8884d8"
        isAnimationActive={false}
      />
      <Scatter
        activeShape={{ fill: 'red' }}
        name="A school"
        dataKey="death"
        fill="red"
        isAnimationActive={false}
      />
      <XAxis
        dataKey="t"
        tickFormatter={(v) => Math.round(v).toString()}
        type="number"
        label={{
          value: t('days'),
          position: 'insideBottom',
          offset: 0,
          fontSize: '0.8rem',
        }}
        minTickGap={0}
        ticks={Array.from(
          { length: DAY_INTERVAL },
          (x, k) => Math.max(time - DAY_INTERVAL, 0) + k,
        )}
        style={{
          fontSize: '0.8rem',
        }}
      />
      <YAxis
        label={{
          value: t('temperature'),
          angle: -90,
          fontSize: '0.8rem',
          position: 'inside',
        }}
        domain={[20, 36]}
        tickCount={100}
        tickFormatter={(v) => Math.floor(v).toString()}
        style={{
          fontSize: '0.6rem',
        }}
      />
      <Tooltip content={CustomTooltip} />
    </AreaChart>
  );
}
