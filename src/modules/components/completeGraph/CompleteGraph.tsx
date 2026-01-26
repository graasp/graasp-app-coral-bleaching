import { JSX } from 'react';

import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  DotItemDotProps,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTemperatureHistory, useTime } from '@/utils/hooks';

const DAY_INTERVAL = 20;
const controlsWidth = 150;

function humanizeDays(value) {
  const days = Math.floor(value);
  const hours = Math.round((value - days) * 24);

  let result = [];

  if (days > 0) {
    result.push(days === 1 ? '1 day' : `${days} days`);
  }

  if (hours > 0) {
    result.push(hours === 1 ? '1 hour' : `${hours} hours`);
  }

  return result.join(' and ');
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  const isVisible = active && payload && payload.length;
  console.log(payload);
  return (
    <div
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        backgroundColor: 'white',
        padding: '2px',
        border: '1px solid #ccc',
      }}
    >
      {isVisible && (
        <>
          <div>{`${humanizeDays(label)}`}</div>
          <div style={{ fontWeight: 'bold' }}>
            {`${payload[0].value.toFixed(1)}°C`}{' '}
          </div>
        </>
      )}
    </div>
  );
};

// eslint-disable-next-line react/function-component-definition
export function CompleteGraph(): JSX.Element {
  const { data: time } = useTime();
  const { data: log } = useTemperatureHistory();

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
      <XAxis
        dataKey="t"
        tickFormatter={(t) => Math.floor(t).toString()}
        type="number"
        label={{ value: 'days', position: 'insideBottom' }}
        // minTickGap={3}
        // ticks={log.map(({ t }) => Math.floor(t))}
        tickCount={20}
        style={{
          fontSize: '0.8rem',
        }}
      />
      <YAxis
        label={{
          value: 'temperature',
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
