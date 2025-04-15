import { ReactNode } from 'react';
import { Text } from 'react-konva';

import { useCurrentTemperature } from '@/utils/hooks.js';

import {
  SCALE_UNITS,
  THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE,
  THERMOMETER_WIDTH,
} from '../../../config/constants.js';
import { kelvinToCelsius } from '../../../utils/utils.js';

const CurrentTemperature = ({ x, y }: { x: number; y: number }): ReactNode => {
  const { data: temperature } = useCurrentTemperature();

  const scaleUnit = SCALE_UNITS.CELSIUS; // TODO: get scale unit

  let text;
  switch (scaleUnit) {
    case SCALE_UNITS.CELSIUS:
      text =
        Math.round(kelvinToCelsius(temperature) * 10) / 10 + scaleUnit.unit;
      break;
    case SCALE_UNITS.KELVIN:
    default:
      text = Math.round(temperature * 10) / 10 + scaleUnit.unit;
      break;
  }

  return (
    <Text
      x={x - THERMOMETER_WIDTH / 2}
      y={y}
      text={text}
      fontSize={THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE}
    />
  );
};

export default CurrentTemperature;
