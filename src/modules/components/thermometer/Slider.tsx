import { ReactNode } from 'react';
import { RegularPolygon } from 'react-konva';

import { KonvaEventObject } from 'konva/lib/Node';

import { useUpdateCurrentTemperature } from '@/utils/hooks';

import {
  BACKGROUND_COLOR,
  SCALE_LABEL_NOTES_STROKE_WIDTH,
  SCALE_PADDING_LEFT,
  SCALE_TEXT_WIDTH_FACTOR,
  SCALE_WIDTH,
  SLIDER_FILL_COLOR,
  SLIDER_RADIUS,
  THERMOMETER_POSITION_X,
  THERMOMETER_WIDTH,
} from '../../../config/constants';

const heightToTemperature = ({
  height,
  deltaTemperatureHeight,
  minTemperature,
  offsetY,
  thermometerHeight,
}: {
  height: number;
  deltaTemperatureHeight: number;
  minTemperature: number;
  maxTemperature: number;
  offsetY: number;
  thermometerHeight: number;
}): number => {
  const newTemperature =
    (thermometerHeight + offsetY - height) / deltaTemperatureHeight +
    minTemperature;

  // clamp value
  // let value = newTemperature;
  // if (value < minTemperature) {
  //   value = minTemperature;
  // } else if (value > maxTemperature) {
  //   value = maxTemperature;
  // }

  return newTemperature;
};

const Slider = ({
  thermometerHeight,
  offsetY,
  y,
  minTemperature,
  maxTemperature,
  deltaTemperatureHeight,
}: {
  thermometerHeight: number;
  offsetY: number;
  y: number;
  minTemperature: number;
  maxTemperature: number;
  deltaTemperatureHeight: number;
}): ReactNode => {
  const { mutate: updateCurrentTemperature } = useUpdateCurrentTemperature();

  const onMouseEnter = (event: KonvaEventObject<MouseEvent>): void => {
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = 'grab';
    }
  };

  const onMouseLeave = (event: KonvaEventObject<MouseEvent>): void => {
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = 'default';
    }
  };

  const sliderPositionX =
    THERMOMETER_POSITION_X +
    THERMOMETER_WIDTH +
    SCALE_WIDTH +
    SCALE_PADDING_LEFT +
    SCALE_TEXT_WIDTH_FACTOR;

  const minThermometerHeight = offsetY + thermometerHeight;
  const maxThermomerterHeight = minThermometerHeight - thermometerHeight;

  return (
    <RegularPolygon
      draggable
      fillAfterStrokeEnabled
      stroke={BACKGROUND_COLOR}
      strokeWidth={SCALE_LABEL_NOTES_STROKE_WIDTH}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      dragBoundFunc={(pos) => {
        // clamp y position
        let newPositionY = pos.y;
        if (newPositionY > minThermometerHeight) {
          newPositionY = minThermometerHeight;
        } else if (newPositionY < maxThermomerterHeight) {
          newPositionY = maxThermomerterHeight;
        }
        // compute temperature from slider y position
        const newTemperature = heightToTemperature({
          height: newPositionY,
          deltaTemperatureHeight,
          minTemperature,
          maxTemperature,
          offsetY,
          thermometerHeight,
        });

        updateCurrentTemperature(newTemperature);

        return { x: sliderPositionX, y: newPositionY };
      }}
      x={sliderPositionX}
      y={y}
      sides={3}
      radius={SLIDER_RADIUS}
      rotation={30}
      fill={SLIDER_FILL_COLOR}
    />
  );
};

export default Slider;
