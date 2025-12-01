import { ReactNode, useEffect, useRef, useState } from 'react';

import { animate, motion } from 'motion/react';

import { useContext, useUpdateCurrentTemperature } from '@/utils/hooks';
import { kelvinToCelsius } from '@/utils/utils';

import {
  SCALE_LABEL_NOTES_STROKE_WIDTH,
  SCALE_WIDTH,
  SLIDER_FILL_COLOR,
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
  const {
    data: { reset },
  } = useContext();

  const [drag, setDrag] = useState<'y' | false>(false);
  const ref = useRef(null);
  useEffect(() => {
    setDrag('y');
  }, []);

  const { mutate: updateCurrentTemperature } = useUpdateCurrentTemperature();

  // reset slider position on reset
  useEffect(() => {
    if (ref.current) {
      animate('#slider', { y }, { duration: 0 });
    }
  }, [reset]);

  const sliderPositionX =
    THERMOMETER_POSITION_X + THERMOMETER_WIDTH + SCALE_WIDTH;

  const minThermometerHeight = offsetY + thermometerHeight - 30;
  const maxThermomerterHeight = minThermometerHeight - thermometerHeight + 40;

  return (
    <motion.polygon
      id="slider"
      drag={drag}
      ref={ref}
      dragConstraints={{
        top: maxThermomerterHeight,
        bottom: minThermometerHeight,
      }}
      dragElastic={false}
      dragMomentum={false}
      stroke="black"
      strokeWidth={SCALE_LABEL_NOTES_STROKE_WIDTH}
      onDrag={() => {
        if (ref.current) {
          const coords =
            ref.current.style.transform.match(/translateY\((.+)px\)/);
          const newPositionY = coords[1];

          // compute temperature from slider y position
          const newTemperature = heightToTemperature({
            height: newPositionY,
            deltaTemperatureHeight,
            minTemperature,
            maxTemperature,
            offsetY,
            thermometerHeight,
          });

          updateCurrentTemperature(kelvinToCelsius(newTemperature));
        }
      }}
      style={{ x: sliderPositionX, y }}
      points="28,40 10,30 28,20"
      fill={SLIDER_FILL_COLOR}
    />
  );
};

export default Slider;
