import React, { ReactNode } from 'react';

import { useAnimation } from '@/utils/hooks';

// eslint-disable-next-line react/function-component-definition
function Background({
  width,
  height,
  withSand = false,
  isPlaying = false,
}: {
  width: number;
  height: number;
  withSand?: boolean;
  isPlaying?: boolean;
}): ReactNode {
  const offsetY = withSand ? height * 0.35 : 0;

  return (
    <>
      <defs>
        <linearGradient id="ocean-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPlaying ? '#9bf0ff' : '#a5cdd4ff'} />
          <stop offset="100%" stopColor={isPlaying ? '#70cfed' : '#88b8c6ff'} />
        </linearGradient>
      </defs>
      <rect
        id="ocean"
        // x={0}
        // y={0}
        width={width}
        height={height - offsetY}
        fill="url(#ocean-grad)"
      />
      {withSand && (
        <rect
          x={0}
          y={height - offsetY}
          width={width}
          height={offsetY}
          fill="#f7dc6b"
        />
      )}
    </>
  );
}

export default Background;
