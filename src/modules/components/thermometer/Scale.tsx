import { ReactNode } from 'react';
import { Group, Rect, Text } from 'react-konva';

import {
  SCALE_FONT_SIZE,
  SCALE_HEIGHT,
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

      return (
        <Group key={text} y={thermometerYPosition} x={offsetX}>
          <Text
            x={textXOffset}
            y={-SCALE_FONT_SIZE / 3}
            text={text}
            fontSize={SCALE_FONT_SIZE}
          />
          <Rect
            x={scaleXOffset}
            width={SCALE_WIDTH}
            height={SCALE_LINE_HEIGHT}
            fill={THERMOMETER_STROKE_COLOR}
          />
        </Group>
      );
    })}
  </>
);

const buildKelvinScales = ({
  to,
  from,
  tickStep,
  thermometerHeight,
  offsetY,
  offsetX,
  deltaHeight,
}: {
  to: number;
  from: number;
  tickStep: number;
  thermometerHeight: number;
  offsetY: number;
  offsetX: number;
  deltaHeight: number;
}): ReactNode => {
  // compute text and y position for kelvin scales
  let scales = Array.from(
    {
      length: (to - from) / tickStep + 1, // +1 to include max
    },
    (key, idx) => {
      const value = idx * tickStep + from;
      return { text: value, y: (value - from) * deltaHeight };
    },
  );

  // select marks at most number of scale we can display
  const maxNbScale = Math.floor(thermometerHeight / SCALE_HEIGHT);
  const prop = Math.ceil(scales.length / maxNbScale);
  if (prop > 1) {
    scales = scales.filter((_, i) => i % prop === 0);
  }

  // draw scale ticks
  const ScaleComponents = renderScales({
    offsetY: offsetY + thermometerHeight - SCALE_LINE_HEIGHT,
    x: offsetX,
    scales,
    scaleXOffset: 0,
    textXOffset: -SCALE_PADDING_RIGHT - SCALE_WIDTH,
  });

  return ScaleComponents;
};

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

  // build kelvin scales
  const KelvinScaleComponents = buildKelvinScales({
    from: roundFrom,
    to: roundTo,
    offsetY,
    offsetX: thermometerXPosition - THERMOMETER_WIDTH,
    tickStep,
    thermometerHeight,
    deltaHeight: deltaKelvinHeight,
  });

  // build celsius scales
  const CelsiusScaleComponents = buildCelsiusScales({
    from,
    to,
    offsetY: offsetY + thermometerHeight - SCALE_LINE_HEIGHT,
    offsetX: thermometerXPosition - THERMOMETER_WIDTH,
    roundFromKelvin: roundFrom,
    deltaKelvinHeight,
  });

  // const LabelNoteComponents = SCALE_LABEL_NOTES.map(
  //   ({ name, t: temperature }) => (
  //     <Group
  //       key={name}
  //       x={thermometerXPosition}
  //       y={
  //         offsetY +
  //         thermometerHeight -
  //         (temperature - roundFrom) * deltaKelvinHeight
  //       }
  //     >
  //       <Line
  //         x={-THERMOMETER_WIDTH}
  //         points={[0, 0, THERMOMETER_WIDTH + SCALE_TEXT_WIDTH_FACTOR - 5, 0]}
  //         stroke={SCALE_TICKS_STROKE_COLOR}
  //         dash={SCALE_LABELS_LINE_DASH}
  //         strokeWidth={1}
  //       />
  //       <Text
  //         x={SCALE_TEXT_WIDTH_FACTOR}
  //         y={-SCALE_FONT_SIZE / 2}
  //         fontStyle="italic"
  //         stroke={BACKGROUND_COLOR}
  //         strokeWidth={SCALE_LABEL_NOTES_STROKE_WIDTH}
  //         fillAfterStrokeEnabled
  //         text={t(name)}
  //         fontSize={SCALE_FONT_SIZE}
  //       />
  //     </Group>
  //   ),
  // );

  // compute fill height given current temperature value
  const fillValue = temperatureToHeight({
    deltaTemperatureHeight: deltaKelvinHeight,
    currentTemperature,

    minTemperature: roundFrom,
    maxTemperature: roundTo,
  });

  // absolute y position for given temperature
  const currentTemperatureY = offsetY + thermometerHeight - fillValue;

  return (
    <>
      {/* current temperature fill */}
      <Rect
        fill={THERMOMETER_COLOR}
        x={THERMOMETER_POSITION_X}
        y={currentTemperatureY}
        width={THERMOMETER_WIDTH}
        height={fillValue}
      />

      {/* scales */}
      {showKelvinScale && KelvinScaleComponents}
      {!showKelvinScale && CelsiusScaleComponents}

      {/* label notes: planets, etc */}
      {/* {DEFAULT_SHOW_THERMOMETER_LABELS && LabelNoteComponents} */}

      {/* triangle slider */}
      <Slider
        deltaTemperatureHeight={deltaKelvinHeight}
        y={currentTemperatureY}
        offsetY={offsetY}
        thermometerHeight={thermometerHeight}
        minTemperature={roundFrom}
        maxTemperature={roundTo}
      />
    </>
  );
};

export default Scale;
