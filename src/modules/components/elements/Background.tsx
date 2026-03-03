import { ReactNode } from 'react';

import { Bubble } from '../coral/Bubble';

// eslint-disable-next-line react/function-component-definition
export function Background({
  width,
  height,
  isPlaying = false,
}: {
  width: number;
  height: number;
  isPlaying?: boolean;
}): ReactNode {
  return (
    <>
      <defs>
        <linearGradient id="ocean-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPlaying ? '#9bf0ff' : '#a5cdd4ff'} />
          <stop offset="100%" stopColor={isPlaying ? '#70cfed' : '#88b8c6ff'} />
        </linearGradient>
      </defs>
      <rect id="ocean" width={width} height={height} fill="url(#ocean-grad)" />
      {isPlaying && (
        <>
          <Bubble duration={10} x="60%" y={500} />
          <Bubble r={10} duration={5} x="25%" y={500} />
          <Bubble r={12} duration={7} x="75%" y={500} />
        </>
      )}
    </>
  );
}
