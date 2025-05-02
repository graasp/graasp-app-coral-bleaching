import { useEffect, useState } from 'react';

import { motion, transform, useAnimate } from 'motion/react';

import { CoralStatus, useContext } from '@/utils/hooks';

export const CoralBranch = ({
  kelpAmount,
  color,
  status,
  offsetX,
  offsetY,
  delay = 0,
  id,
  transformSvg = '',
}) => {
  const [minGrowth, setMinGrowth] = useState(0);

  const growth = transform(kelpAmount - delay, [50, 100], [0, 100]);

  const {
    data: { reset },
  } = useContext();

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (minGrowth < growth) {
      setMinGrowth(growth);
    }
  }, [growth]);

  useEffect(() => {
    switch (status) {
      case CoralStatus.Dead: {
        animate(`.coral${id}`, { y: 300 }, { duration: 4 });
        break;
      }
      default:
        break;
    }
  }, [animate, status]);

  // on reset
  useEffect(() => {
    setMinGrowth(0);
    animate(`.coral${id}`, { y: 0 }, { duration: 1 });
  }, [animate, reset]);

  return (
    <g ref={scope} transform={`scale(0.6) ${transformSvg}`}>
      <defs>
        <linearGradient
          id={`mask${id}`}
          x1="0%"
          y1="50%"
          x2={Math.max(growth, minGrowth) + '%'}
          y2="50%"
        >
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <motion.path
        className={`coral${id}`}
        d={`m ${offsetX} ${offsetY} c -4.521 -1.968 -9.773 0.083 -11.74 4.604 c -0.337 0.753 -6.237 13.531 -20.072 20.777 c 4.129 -5.834 7.395 -11.523 9.955 -16.794 c 12.172 -25.057 11.727 -46.259 11.702 -47.15 c -0.138 -4.929 -4.239 -8.84 -9.175 -8.675 c -4.929 0.138 -8.813 4.245 -8.675 9.175 c 0.015 0.52 0.516 38.164 -32.664 69.396 c -13.195 -15.72 -11.573 -37.525 -11.547 -37.848 c 0.431 -4.898 -3.181 -9.226 -8.081 -9.675 c -4.919 -0.452 -9.256 3.167 -9.705 8.079 c -0.112 1.229 -2.413 29.147 15.431 50.646 c -8.539 5.888 -18.653 11.284 -30.609 15.834 c -15.461 6.59 -9.461 22.59 0.199 18.919 c 22.448 -7.672 39.474 -18.024 52.378 -29.129 c 40.916 0.001 56.567 -34.891 57.217 -36.384 c 1.969 -4.526 -0.093 -9.808 -4.614 -11.775 z`}
        fill={`url(#mask${id})`}
      />
    </g>
  );
};
