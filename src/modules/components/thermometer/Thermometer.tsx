import { ReactNode } from 'react';
import { Group } from 'react-konva';

import { useCurrentTemperature, useStageDimensions } from '@/utils/hooks';

import {
  SCALE_LEGEND_PADDING_BOTTOM,
  THERMOMETER_COLOR,
  THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE,
  THERMOMETER_HEIGHT_FACTOR,
  THERMOMETER_POSITION_X,
  THERMOMETER_POSITION_Y_FACTOR,
  THERMOMETER_STROKE_COLOR,
  THERMOMETER_STROKE_WIDTH,
} from '../../../config/constants';
import CurrentTemperature from './CurrentTemperature.js';
import Scale from './Scale.js';
import ThermometerShape from './ThermometerShape';

const Thermometer = (): ReactNode => {
  const {
    data: { height: stageHeight },
  } = useStageDimensions();
  const thermometerHeight = stageHeight * THERMOMETER_HEIGHT_FACTOR;
  const offsetY = stageHeight * THERMOMETER_POSITION_Y_FACTOR;
  const { data: currentTemperature } = useCurrentTemperature();
  return (
    <Group>
      <Scale
        thermometerHeight={thermometerHeight}
        offsetY={offsetY}
        scales={{ from: 271, to: 313 }}
        currentTemperature={currentTemperature}
        // showKelvinScale
      />
      <ThermometerShape
        fillColor={THERMOMETER_COLOR}
        thermometerHeight={thermometerHeight}
        offsetY={offsetY}
        stroke={THERMOMETER_STROKE_COLOR}
        strokeWidth={THERMOMETER_STROKE_WIDTH}
      />
      <CurrentTemperature
        x={THERMOMETER_POSITION_X}
        y={
          offsetY -
          SCALE_LEGEND_PADDING_BOTTOM -
          THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE / 2
        }
      />
    </Group>
  );
};

export default Thermometer;
