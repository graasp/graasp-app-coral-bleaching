import { ReactNode } from 'react';
import { Shape } from 'react-konva';

import { Context } from 'konva/lib/Context';
import { ShapeConfig, type Shape as ShapeType } from 'konva/lib/Shape';

import {
  THERMOMETER_POSITION_X,
  THERMOMETER_RADIUS,
  THERMOMETER_WIDTH,
} from '../../../config/constants';

const ThermometerShape = ({
  stroke = '',
  strokeWidth = 0,
  fillColor = '',
  thermometerHeight,
  offsetY,
}: {
  stroke?: string;
  strokeWidth?: number;
  fillColor?: string;
  thermometerHeight: number;
  offsetY: number;
}): ReactNode => {
  // use trigonometry to get the exact angle matching the circle and the rectangle
  // the angle is used to draw the most perfect mercury bulb
  const angle = Math.asin(THERMOMETER_WIDTH / 2 / THERMOMETER_RADIUS);

  // compute start and end angles to draw the bulb
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  const computeStartAngle = (): number => -Math.PI / 2 + angle;

  const computeEndAngle = (): number => -angle + (3 / 2) * Math.PI;

  const drawThermometerShape = (
    context: Context,
    shape: ShapeType<ShapeConfig>,
    height: number,
  ): void => {
    const totalOffset = offsetY + thermometerHeight - height;

    // draw fill rectangle

    context.beginPath();
    // draw top and right straight lines
    context.lineTo(THERMOMETER_POSITION_X, totalOffset);
    context.lineTo(THERMOMETER_POSITION_X + THERMOMETER_WIDTH, totalOffset);
    context.lineTo(
      THERMOMETER_POSITION_X + THERMOMETER_WIDTH,
      totalOffset + height,
    );

    // draw bulb
    context.arc(
      THERMOMETER_POSITION_X + THERMOMETER_WIDTH / 2,
      totalOffset + height + THERMOMETER_RADIUS,
      THERMOMETER_RADIUS,
      computeStartAngle(),
      computeEndAngle(),
    );

    // draw left straight line
    context.lineTo(THERMOMETER_POSITION_X, totalOffset + height);
    context.closePath();
    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
  };

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          drawThermometerShape(context, shape, 0);
        }}
        fill={fillColor}
      />
      <Shape
        sceneFunc={(context, shape) => {
          drawThermometerShape(context, shape, thermometerHeight);
        }}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export default ThermometerShape;
