import { JSX } from 'react';

export const OceanFilter = (): JSX.Element => (
  <filter id="oceanFilter" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.003 0.006"
      numOctaves="1"
      seed="3"
      result="turbulence"
    >
      <animate
        attributeName="baseFrequency"
        dur="60s"
        values="0.01 0.02; 0.02 0.01; 0.01 0.02"
        repeatCount="indefinite"
      />
    </feTurbulence>

    <feDisplacementMap
      in="SourceGraphic"
      in2="turbulence"
      scale="20"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
);
