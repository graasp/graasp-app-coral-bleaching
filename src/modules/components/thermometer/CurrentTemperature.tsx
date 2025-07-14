import { ReactNode } from 'react';

import { useCurrentTemperature } from '@/utils/hooks.js';

import {
  SCALE_UNITS,
  THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE,
  THERMOMETER_WIDTH,
} from '../../../config/constants.js';

const CurrentTemperature = ({ x, y }: { x: number; y: number }): ReactNode => {
  const { data: temperature } = useCurrentTemperature();

  if (temperature) {
    const scaleUnit = SCALE_UNITS.CELSIUS; // TODO: get scale unit

    const text = Math.round(temperature * 10) / 10 + scaleUnit.unit;

    return (
      <text
        x={x - THERMOMETER_WIDTH / 2}
        y={y}
        style={{
          // @ts-ignore
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
        }}
        fontSize={THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE}
      >
        {text}
      </text>
    );
  }

  return null;
};

export default CurrentTemperature;
