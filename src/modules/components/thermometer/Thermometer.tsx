import { ReactNode } from 'react';

import {
  SCALE_LEGEND_PADDING_BOTTOM,
  THERMOMETER_COLOR,
  THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE,
  THERMOMETER_HEIGHT_FACTOR,
  THERMOMETER_POSITION_X,
  THERMOMETER_POSITION_Y_FACTOR,
  THERMOMETER_STROKE_COLOR,
  THERMOMETER_STROKE_WIDTH,
} from '@/config/constants';
import { useCurrentTemperature, useStageDimensions } from '@/utils/hooks';

import CurrentTemperature from './CurrentTemperature';
import Scale from './Scale';
import { ThermometerShape } from './ThermometerShape';

// eslint-disable-next-line react/function-component-definition
export function Thermometer(): ReactNode {
  const { data: currentTemperature } = useCurrentTemperature();
  const {
    data: { height: stageHeight },
  } = useStageDimensions();
  const thermometerHeight = stageHeight * THERMOMETER_HEIGHT_FACTOR;
  const offsetY = stageHeight * THERMOMETER_POSITION_Y_FACTOR;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        zIndex: 203,
        height: '100%',
      }}
    >
      <Scale
        thermometerHeight={thermometerHeight}
        offsetY={offsetY}
        scales={{ from: 295, to: 310 }}
        currentTemperature={currentTemperature}
      />
      <ThermometerShape
        fill={THERMOMETER_COLOR}
        thermometerHeight={thermometerHeight}
        offsetY={offsetY}
        height={0}
      />
      <ThermometerShape
        thermometerHeight={thermometerHeight}
        offsetY={offsetY}
        stroke={THERMOMETER_STROKE_COLOR}
        strokeWidth={THERMOMETER_STROKE_WIDTH}
        height={thermometerHeight}
      />
      <CurrentTemperature
        x={THERMOMETER_POSITION_X}
        y={
          offsetY -
          SCALE_LEGEND_PADDING_BOTTOM / 2 -
          THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE / 2
        }
      />
    </svg>
  );
}
