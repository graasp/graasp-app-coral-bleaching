/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import {
  useAnimation,
  useGrowthScale,
  useIsDead,
  useKelpAmount,
  useReset,
  useSetAnimation,
  useTemperatureHistory,
  useTime,
} from '@/utils/hooks';

const Debug = () => {
  // const { data: kelpAmount } = useKelpAmount();
  const { data: isPlaying } = useAnimation();

  // const { data: growthScale } = useGrowthScale();
  const { mutate: reset } = useReset();
  const { mutate: setAnimation } = useSetAnimation();
  // const { data: isDead } = useIsDead();

  return (
    <div style={{ position: 'absolute', top: 0, left: 200, zIndex: 1000000 }}>
      isPlaying : {isPlaying ? 'isPlaying' : 'stopped'}
      <br />
      {/* isDead : {isDead ? 'isDead' : 'alive'}
      <br />
      kelpAmount : {kelpAmount} */}
      <br />
      <Button title="reset" onClick={reset}>
        Reset
      </Button>
      {isPlaying ? (
        <Button title="stop" onClick={() => setAnimation(false)}>
          Stop
        </Button>
      ) : (
        <Button title="stop" onClick={() => setAnimation(true)}>
          Start
        </Button>
      )}
    </div>
  );
};

export default Debug;
