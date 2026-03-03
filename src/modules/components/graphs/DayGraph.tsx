import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';

import { useTemperatureHistory, useTime } from '@/utils/hooks';

import { humanizeDays } from './utils';

const DAY_INTERVAL = 20;
const controlsWidth = 150;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>): JSX.Element => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        backgroundColor: 'white',
        padding: '2px',
        border: '1px solid #ccc',
      }}
    >
      {isVisible && label && (
        <>
          {/* @ts-expect-error */}
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
export function DayGraph(): JSX.Element {
  const { data: time } = useTime();
  const { t } = useTranslation();
  const { data: log } = useTemperatureHistory();

  const slicedData = log.filter(
    ({ t: value }) => value > Math.max(time - DAY_INTERVAL, 0),
  );

  return (
    <AreaChart
      // minus padding, minus controls width
      width={window.innerWidth - 100 - controlsWidth}
      height={150}
      data={slicedData}
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
        tickFormatter={(v) => Math.round(v).toString()}
        type="number"
        label={{ value: t('days'), position: 'insideBottom' }}
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
          position: 'inside',
          textAnchor: 'middle',
        }}
        includeHidden
        domain={[20, 38]}
        tickFormatter={(v) => Math.floor(v).toString()}
        style={{
          fontSize: '0.8rem',
        }}
      />
      <Tooltip content={CustomTooltip} />
    </AreaChart>
  );
}
