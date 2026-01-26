import React from 'react';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton, Stack } from '@mui/material';

import { useReset } from '@/utils/hooks';

import Controls from '../Controls';
import DayGraph from '../DayGraph';

const backgroundColor = 'rgba(200, 200, 200, 0.5)';

function Footer() {
  const { mutate: reset } = useReset();
  return (
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
          <IconButton
            title="reset"
            onClick={() => reset()}
            sx={{ background: backgroundColor }}
          >
            <FullscreenIcon fontSize="medium" />
          </IconButton>
        </span>
      </Stack>
    </Stack>
  );
}

export default Footer;
