import React, { ReactNode } from 'react';

import MicroCoral from '../components/coral/MicroCoral';
import Background from '../components/elements/Background';
import { Sunshine } from '../components/elements/Sunshine';

// eslint-disable-next-line react/function-component-definition
function MicroView({
  width,
  height,
}: {
  width: number;
  height: number;
}): ReactNode {
  return (
    <>
      <svg width={width} height={height}>
        <Background width={width} height={height} />
        <Sunshine width={width} height={height} />
      </svg>
      <MicroCoral />
    </>
  );
}

export default MicroView;
