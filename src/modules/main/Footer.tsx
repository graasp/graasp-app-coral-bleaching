import { JSX } from 'react';

import { Stack } from '@mui/material';

import Controls from '../Controls';
import CompleteGraphModal from '../components/graphs/CompleteGraphModal';
import { DayGraph } from '../components/graphs/DayGraph';

export const Footer = (): JSX.Element => (
  <Stack
    px={2}
    py={2}
    style={{
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 1000,
    }}
  >
    <Stack
      borderRadius={5}
      justifyContent="center"
      direction="row"
      p={2}
      style={{
        width: '100%',
        background: 'white',
      }}
    >
      <Controls />
      <DayGraph />
      <span>
        <CompleteGraphModal />
      </span>
    </Stack>
  </Stack>
);
