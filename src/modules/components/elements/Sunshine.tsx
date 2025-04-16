/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactNode } from 'react';
import { Rect, RegularPolygon, Shape } from 'react-konva';

export const Sunshine = ({ width, height }) => {
  const [colorStops, setColorStops] = React.useState([
    0,
    '#9bf0ff',
    1,
    '#70cfed',
  ]);
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(width / 4, 0);
        context.lineTo(width / 1.2, height);
        context.lineTo(width / 5, height);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      x={width / 8}
      y={0}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{ x: width / 2, y: height }}
      fillLinearGradientColorStops={[0, '#BEF7F2dd', 1, '#BEF7F200']}
    />
  );
};
