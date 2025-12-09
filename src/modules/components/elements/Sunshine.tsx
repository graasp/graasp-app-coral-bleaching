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
          <stop offset="0%" stopColor="rgba(190, 247, 242, 0.37)" />
          <stop offset="100%" stopColor="#BEF7F200" />
        </linearGradient>
      </defs>
      <polygon
        id="sunshine"
        x={width / 8}
        y={0}
        fill="url(#grad)"
        points={`320,0 900,0 1270,${height} 250,${height}`}
      />
    </g>
  );
};
