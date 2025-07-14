import { JSX } from 'react';

import { Box, Typography } from '@mui/material';

import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';

import { useTemperatureHistory, useTime } from '@/utils/hooks';
import { kelvinToCelsius } from '@/utils/utils';

const DAY_INTERVAL = 10;

// eslint-disable-next-line react/function-component-definition
function DayCounter(): JSX.Element {
  const { data: time } = useTime();
  const { data: log } = useTemperatureHistory();

  const slicedData = log.filter(
    ({ t }) => t > Math.max(time - DAY_INTERVAL, 0),
  );

  return (
    <Box sx={{ position: 'absolute', right: 0, top: 0, background: 'white' }}>
      <Box
        px={3}
        py={2}
        m={0}
        borderRadius={5}
        textAlign="center"
        justifyContent="center"
        alignContent="center"
      >
        <Typography variant="h3">{Math.floor(time)}</Typography>
        <Typography>jours</Typography>
      </Box>
      <AreaChart
        width={300}
        height={150}
        data={slicedData}
        margin={{ right: 20 }}
      >
        <XAxis
          dataKey="t"
          //   tickFormatter={(t, idx) => {
          //     const day = Math.floor(t);
          //     const lastIdx = slicedData.findLastIndex(({ t: ti }) => {
          //       return Math.floor(ti) === day;
          //     });
          //     return idx === lastIdx ? Math.floor(t).toString() : '';
          //   }}
          tickFormatter={(t) => Math.floor(t).toString()}
          type="number"
          //   domain={[Math.max(time - 10, 0), Math.floor(time) + 10]}
          //   tickCount={10}
          minTickGap={0}
          ticks={Array.from(
            { length: DAY_INTERVAL },
            (x, k) => Math.max(time - DAY_INTERVAL, 0) + k,
          )}
        />
        <YAxis
          includeHidden
          domain={[290, 310]}
          tickFormatter={(t) => Math.floor(kelvinToCelsius(t)).toString()}
        />
        <Tooltip />
        <Area
          dataKey="temp"
          fill="#8884d8"
          activeDot={{ r: 8 }}
          animationDuration={0}
        />
      </AreaChart>
    </Box>
  );
}

export default DayCounter;
