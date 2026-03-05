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

import { Tooltip as CustomTooltip } from './Tooltip';
import { useMergedLogs } from './useMergedLogs';

const controlsWidth = 150;

// eslint-disable-next-line react/function-component-definition
export function CompleteGraph(): JSX.Element {
  const { t: translate } = useTranslation();
  const log = useMergedLogs();

  return (
    <AreaChart
      // minus padding, minus controls width
      width={window.innerWidth - 100 - controlsWidth}
      height={450}
      data={log}
      margin={{ right: 20 }}
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
        isAnimationActive={false}
        fill="red"
      />
      <XAxis
        dataKey="t"
        tickFormatter={(t) => Math.round(t).toString()}
        type="number"
        label={{ value: translate('days'), position: 'insideBottom' }}
        style={{
          fontSize: '0.8rem',
        }}
      />
      <YAxis
        label={{
          value: translate('temperature'),
          angle: -90,
          position: 'inside',
          textAnchor: 'middle',
        }}
        includeHidden
        domain={[20, 38]}
        tickFormatter={(t) => Math.floor(t).toString()}
        style={{
          fontSize: '0.8rem',
        }}
      />
      <Tooltip content={CustomTooltip} />
    </AreaChart>
  );
}
