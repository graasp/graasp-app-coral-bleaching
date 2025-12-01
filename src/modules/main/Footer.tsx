import React from 'react';

import { Stack } from '@mui/material';

import Controls from '../Controls';
import DayGraph from '../DayGraph';

function Footer() {
  return (
    <Stack
      justifyContent="center"
      direction="row"
      pb={2}
      pt={2}
      style={{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        background: 'white',
      }}
    >
      <Controls />
      <DayGraph />
    </Stack>
  );
}

export default Footer;
