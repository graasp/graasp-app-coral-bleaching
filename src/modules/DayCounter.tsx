import { JSX } from 'react';

import { Box, Typography } from '@mui/material';

import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';

import { useTemperatureHistory, useTime } from '@/utils/hooks';

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
          tickFormatter={(t) => Math.floor(t).toString()}
          type="number"
          minTickGap={0}
          ticks={Array.from(
            { length: DAY_INTERVAL },
            (x, k) => Math.max(time - DAY_INTERVAL, 0) + k,
          )}
        />
        <YAxis
          includeHidden
          domain={[20, 38]}
          tickFormatter={(t) => Math.floor(t).toString()}
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
