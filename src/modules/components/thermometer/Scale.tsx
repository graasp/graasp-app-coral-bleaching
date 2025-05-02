import { ReactNode } from 'react';

import {
  SCALE_FONT_SIZE,
  SCALE_LINE_HEIGHT,
  SCALE_MAX_NUMBER_TICKS,
  SCALE_PADDING_RIGHT,
  SCALE_WIDTH,
  THERMOMETER_COLOR,
  THERMOMETER_POSITION_X,
  THERMOMETER_STROKE_COLOR,
  THERMOMETER_WIDTH,
  TICK_STEP_FACTOR,
} from '../../../config/constants';
import { celsiusToKelvin, kelvinToCelsius } from '../../../utils/utils.js';
import Slider from './Slider.js';

// compute the corresponding height in px given the temperature
const temperatureToHeight = ({
  currentTemperature,
  deltaTemperatureHeight,
  minTemperature,
  maxTemperature,
}: {
  currentTemperature: number;
  deltaTemperatureHeight: number;
  minTemperature: number;
  maxTemperature: number;
}): number => {
  let value = currentTemperature;
  if (value < minTemperature) {
    value = minTemperature;
  } else if (value > maxTemperature) {
    value = maxTemperature;
  }
  return (-minTemperature + value) * deltaTemperatureHeight;
};

const renderScales = ({
  scales,
  x: offsetX,
  offsetY,
  scaleXOffset,
  textXOffset,
}: {
  scales: { text: number; y: number }[];
  x: number;
  offsetY: number;
  scaleXOffset: number;
  textXOffset: number;
}): ReactNode => (
  <>
    {/* legend */}
    {scales.map(({ text, y }) => {
      const thermometerYPosition = offsetY - y;

      // y={thermometerYPosition} x={offsetX}

      return (
        <g key={text}>
          <text
            style={{
              '-webkit-user-select': 'none',
              '-moz-user-select': 'none',
              '-ms-user-select': 'none',
              'user-select': 'none',
            }}
            x={offsetX + textXOffset}
            y={thermometerYPosition - SCALE_FONT_SIZE / 3}
            fontSize={SCALE_FONT_SIZE}
            fill={THERMOMETER_STROKE_COLOR}
          >
            {text}
          </text>
          <rect
            x={offsetX + scaleXOffset}
            // y={thermometerYPosition - SCALE_FONT_SIZE / 3}
            y={thermometerYPosition - SCALE_FONT_SIZE / 2}
            width={SCALE_WIDTH}
            height={SCALE_LINE_HEIGHT}
            fill={THERMOMETER_STROKE_COLOR}
          />
        </g>
      );
    })}
  </>
);

const buildCelsiusScales = ({
  from,
  to,
  roundFromKelvin,
  deltaKelvinHeight,
  offsetY,
  offsetX,
}: {
  from: number;
  to: number;
  roundFromKelvin: number;
  deltaKelvinHeight: number;
  offsetY: number;
  offsetX: number;
}): ReactNode => {
  // get celsium degree from kelvin thermometer boundaries
  const celsiusFrom = kelvinToCelsius(from);
  const celsiusTo = kelvinToCelsius(to);

  // compute ideal step between ticks
  const celsiusTickStep = Math.ceil(
    (Math.abs(celsiusTo) + Math.abs(celsiusFrom)) / SCALE_MAX_NUMBER_TICKS,
  );

  // round min and max to closest scale steps
  // these bounds might not include from and to values
  const celsiusRoundFrom =
    celsiusTickStep * Math.ceil(celsiusFrom / celsiusTickStep);
  const celsiusRoundTo =
    celsiusTickStep * Math.floor(celsiusTo / celsiusTickStep);

  // compute scales text and y position based on kelvin scales
  const celsiusScales = Array.from(
    {
      length: (celsiusRoundTo - celsiusRoundFrom) / celsiusTickStep + 1, // +1 to include max
    },
    (key, idx) => {
      const value = idx * celsiusTickStep + celsiusRoundFrom;
      return {
        text: value,
        y:
          (celsiusToKelvin(value) - Math.abs(roundFromKelvin)) *
          deltaKelvinHeight,
      };
    },
  );

  // draw scale ticks
  const CelsiusScaleComponents = renderScales({
    offsetY,
    x: offsetX,
    scales: celsiusScales,
    scaleXOffset: 0,
    textXOffset: -SCALE_PADDING_RIGHT - SCALE_WIDTH,
  });

  return CelsiusScaleComponents;
};

const Scale = ({
  currentTemperature,
  scales: { from, to },
  thermometerHeight,
  offsetY,
  showKelvinScale,
}: {
  currentTemperature: number;
  scales: { from: number; to: number };
  thermometerHeight: number;
  offsetY: number;
  showKelvinScale?: boolean;
}): ReactNode => {
  const thermometerXPosition = THERMOMETER_POSITION_X + THERMOMETER_WIDTH;

  // compute ideal step distance between ticks
  const tickStep =
    Math.ceil((Math.abs(to) + Math.abs(from)) / SCALE_MAX_NUMBER_TICKS) *
    TICK_STEP_FACTOR;

  // round min and max to closest scale steps
  const roundFrom = tickStep * Math.floor(from / tickStep);
  const roundTo = tickStep * Math.ceil(to / tickStep) || tickStep;

  // height in pixel for one degree kelvin
  const deltaKelvinHeight = thermometerHeight / (roundTo - roundFrom);

  // build celsius scales
  const CelsiusScaleComponents = buildCelsiusScales({
    from,
    to,
    offsetY: offsetY + thermometerHeight - SCALE_LINE_HEIGHT,
    offsetX: thermometerXPosition - THERMOMETER_WIDTH,
    roundFromKelvin: roundFrom,
    deltaKelvinHeight,
  });

  // compute fill height given current temperature value
  const fillValue = temperatureToHeight({
    deltaTemperatureHeight: deltaKelvinHeight,
    currentTemperature,

    minTemperature: roundFrom,
    maxTemperature: roundTo,
  });
  // shift bug
  // + 10;

  // absolute y position for given temperature
  const currentTemperatureY = offsetY + thermometerHeight - fillValue;

  return (
    <>
      {/* current temperature fill */}
      <rect
        fill={THERMOMETER_COLOR}
        x={THERMOMETER_POSITION_X}
        y={currentTemperatureY - 7}
        width={THERMOMETER_WIDTH}
        height={fillValue + 7}
      />

      {/* scales */}
      {!showKelvinScale && CelsiusScaleComponents}

      {/* triangle slider */}
      <g transform="translate(0,-35)">
        <Slider
          deltaTemperatureHeight={deltaKelvinHeight}
          y={currentTemperatureY}
          offsetY={offsetY}
          thermometerHeight={thermometerHeight}
          minTemperature={roundFrom}
          maxTemperature={roundTo}
        />
      </g>
    </>
  );
};

export default Scale;
