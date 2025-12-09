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

const DAY_INTERVAL = 10;
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

// const CustomizedDot = (props: DotItemDotProps) => {
//   const { cx, cy, value, payload } = props;

//   if (cx == null || cy == null) {
//     return <g />;
//   }

//   return (
//     <svg
//       x={cx - 10}
//       y={cy - 10}
//       width={20}
//       height={20}
//       fill="red"
//       viewBox="0 0 1024 1024"
//     >
//       <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
//     </svg>
//   );
// };

// eslint-disable-next-line react/function-component-definition
function DayGraph(): JSX.Element {
  const { data: time } = useTime();
  const { data: log } = useTemperatureHistory();

  const slicedData = log.filter(
    ({ t }) => t > Math.max(time - DAY_INTERVAL, 0),
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
      {/* <Line
        type="monotone"
        dataKey="temp"
        stroke="#8884d8"
        dot={CustomizedDot}
      /> */}
      <XAxis
        dataKey="t"
        tickFormatter={(t) => Math.floor(t).toString()}
        type="number"
        label={{ value: 'days', position: 'insideBottom' }}
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

export default DayGraph;
