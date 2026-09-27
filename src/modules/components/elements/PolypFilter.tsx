import { JSX } from 'react';

export const PolypFilter = (): JSX.Element => (
  <filter id="polypFilter" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.001 0.001"
      numOctaves="1"
      seed="5"
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
      scale="25"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
);
