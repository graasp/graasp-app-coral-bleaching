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

import { useTemperatureHistory } from '@/utils/hooks';

import { humanizeDays } from './utils';

const controlsWidth = 150;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>): JSX.Element => {
  const isVisible = active && payload && payload.length;

  const humanizedLabel = humanizeDays(Number.parseFloat(String(label)));

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
          {label && <div>{humanizedLabel}</div>}
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
  const { t: translate } = useTranslation();
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
