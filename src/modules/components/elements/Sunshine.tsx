/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactNode } from 'react';

export const Sunshine = ({ width, height }) => {
  const [colorStops, setColorStops] = React.useState([
    0,
    '#9bf0ff',
    1,
    '#70cfed',
  ]);
  return (
    <g>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#BEF7F2dd" />
          <stop offset="100%" stop-color="#BEF7F200" />
        </linearGradient>
      </defs>
      <polygon
        id="sunshine"
        x={width / 8}
        y={0}
        fill="url(#grad)"
        points={`120,0 400,0 870,${height} 250,${height}`}
      />
    </g>
  );
};
