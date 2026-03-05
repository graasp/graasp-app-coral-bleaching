import { JSX } from 'react';

import { useAnimation } from '@/utils/hooks';

import { OceanFilter } from './OceanFilter';

export const Sunshine = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): JSX.Element => {
  const { data: isPlaying } = useAnimation();
  return (
    <g>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(190, 247, 242, 0.57)" />
          <stop offset="100%" stopColor="#BEF7F200" />
        </linearGradient>
        <OceanFilter />
      </defs>
      <polygon
        id="sunshine"
        x={width / 8}
        y={0}
        fill="url(#grad)"
        points={`320,0 900,0 1270,${height} 250,${height}`}
        filter={isPlaying ? 'url(#oceanFilter)' : ''}
      />
    </g>
  );
};
