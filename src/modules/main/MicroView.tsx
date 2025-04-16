import React, { ReactNode } from 'react';
import { Rect, RegularPolygon, Shape } from 'react-konva';

import { Sunshine } from '../components/elements/Sunshine';

// eslint-disable-next-line react/function-component-definition
function MicroView({
  width,
  height,
}: {
  width: number;
  height: number;
}): ReactNode {
  const [colorStops, setColorStops] = React.useState([
    0,
    '#9bf0ff',
    1,
    '#70cfed',
  ]);

  return (
    <>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        //    fill="#9bf0ff"
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: width, y: height - 100 }}
        fillLinearGradientColorStops={colorStops}
      />
      <Sunshine width={width} height={height} />
    </>
  );
}

export default MicroView;
