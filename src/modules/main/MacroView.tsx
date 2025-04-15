import React, { ReactNode } from 'react';
import { Rect } from 'react-konva';

import Coral from '../components/coral/Coral';

// eslint-disable-next-line react/function-component-definition
function MacroView({
  width,
  height,
}: {
  width: number;
  height: number;
}): ReactNode {
  console.log('wefoijlk');

  const offsetY = height * 0.2;

  return (
    <>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height - offsetY}
        fill="#9bf0ff"
      />
      <Rect
        x={0}
        y={height - offsetY}
        width={width}
        height={offsetY}
        fill="#f7dc6b"
      />
      <Coral />
    </>
  );
}

export default MacroView;
