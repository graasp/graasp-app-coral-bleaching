export const THERMOMETER_COLOR = 'red';
export const THERMOMETER_WIDTH = 20;
export const THERMOMETER_RADIUS = 20;
export const THERMOMETER_POSITION_X = 50;
export const THERMOMETER_STROKE_WIDTH = 3;
export const THERMOMETER_STROKE_COLOR = 'black';
// these factors are used as percentage depending on stage dimensions
export const THERMOMETER_POSITION_Y_FACTOR = 0.2;
export const THERMOMETER_HEIGHT_FACTOR = 0.5;
export const SCALE_UNITS = {
  KELVIN: { name: 'kelvin', unit: 'K' },
  CELSIUS: { name: 'celsius', unit: '°C' },
};
export const THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE = 20;

export const SCALE_WIDTH = 7;
export const SCALE_FONT_SIZE = 13;
export const SCALE_PADDING_LEFT = 7;
export const SCALE_PADDING_RIGHT = 20;
export const SCALE_LINE_HEIGHT = 1.5;
export const SCALE_HEIGHT = 27;
// approximatively the width of the scale text
export const SCALE_TEXT_WIDTH_FACTOR = SCALE_FONT_SIZE;
// the actual number of displayed ticks might vary due to number rounding
export const SCALE_MAX_NUMBER_TICKS = 35;
export const SCALE_LEGEND_PADDING_BOTTOM = 30;
export const SCALE_TICKS_STROKE_COLOR = 'black';
export const SCALE_LABEL_NOTES = [];
export const SCALE_LABEL_NOTES_STROKE_WIDTH = 3;
export const TICK_STEP_FACTOR = 0.1;
// apply dashed stroke that is 6px long and 2 pixels apart
export const SCALE_LABELS_LINE_DASH = [6, 2];

export const SLIDER_FILL_COLOR = 'black';
export const SLIDER_RADIUS = 8;
export const SET_INTERVAL_TIME = 50;

// factor of the a value of pixel a kelvin should have, might want to a bigger value from small ranges
export const DELTA_KELVIN_HEIGHT_FACTOR = 1.4;

export const THERMOMETER_TOTAL_WIDTH =
  THERMOMETER_WIDTH +
  THERMOMETER_POSITION_X +
  SCALE_TEXT_WIDTH_FACTOR * 2 + // approximatively left scale text width
  SCALE_PADDING_LEFT +
  SLIDER_RADIUS +
  SCALE_TEXT_WIDTH_FACTOR * 2;

export const MICROSCOPIC_STRING = 'microscopic';
export const MACROSCOPIC_STRING = 'macroscopic';
export const KELVIN_STRING = 'kelvin';
export const CELSIUS_STRING = 'celsius';
export const PAUSED_STRING = 'paused';
export const PLAYING_STRING = 'playing';

// ------

export const CORAL_COLOR = '#F08080';

export const INIT_KELP_AMOUNT = 50;
export const INIT_GROWTH_SCALE = 50;
export const INIT_CURRENT_TEMPERATURE = 300.1;

export const KELP_SPEED = 0.6;
export const TIME_SPEED = 0.1;
export const DEATH_DAY = 3;

export const MIN_TEMP_GROWTH = 296.15;
export const MAX_TEMP_GROWTH = 302.15;
