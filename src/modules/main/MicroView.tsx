import React, { ReactNode } from 'react';

import { useAnimation } from '@/utils/hooks';

import MicroCoral from '../components/coral/MicroCoral';
import Background from '../components/elements/Background';
import { Sunshine } from '../components/elements/Sunshine';
import Polyp from './Polyp';

// eslint-disable-next-line react/function-component-definition
function MicroView({
  width,
  height,
}: {
  width: number;
  height: number;
}): ReactNode {
  const { data: isPlaying } = useAnimation();
  return (
    <>
      <svg width={width} height={height}>
        <Background width={width} height={height} isPlaying={isPlaying} />
        <Sunshine width={width} height={height} />
      </svg>
      <Polyp
        style={{ position: 'absolute', bottom: 190, left: '22%' }}
        width={700}
      />
      {/* <MicroCoral /> */}
    </>
  );
}

export default MicroView;
