import { ReactNode, useEffect, useState } from 'react';

import { motion, transform, useAnimate } from 'motion/react';

import { CORAL_COLOR } from '@/config/constants';
import { useContext, useKelpAmount } from '@/utils/hooks';

import { Polype } from './Polype';

// eslint-disable-next-line arrow-body-style
const MicroCoral = (): ReactNode => {
  const kelpAmount = useKelpAmount();
  const [scope, animate] = useAnimate();
  const [kelpScope, kelpAnimate] = useAnimate();
  const color = transform(kelpAmount, [20, 40], ['#ffffff00', CORAL_COLOR]);
  const bodyOpacity = transform(kelpAmount, [10, 30], [0, 1]);
  const cellOpacity = transform(kelpAmount, [20, 40], [0, 0.4]);
  const { reset } = useContext();
  const strokeWidth = transform(kelpAmount, [0, 40], [0, 40]);

  // const [zCellFill, setzCellFill] = useState(CORAL_COLOR);

  const returnToCoral = () => {
    kelpAnimate(`.un1`, { x: 0, y: 0 }, { duration: 1 });
    kelpAnimate(`.un0`, { x: 0, y: 0 }, { duration: 1 });
  };

  useEffect(() => {
    if (kelpAmount < 35) {
      kelpAnimate(`.un0`, { x: -40, y: -40 }, { duration: 5 });
    } else if (kelpAmount < 40) {
      kelpAnimate(`.un1`, { x: -40, y: -40 }, { duration: 5 });
    } else {
      returnToCoral();
    }
  }, [animate, kelpAmount, kelpAnimate, strokeWidth, reset]);

  // on reset
  useEffect(() => {
    returnToCoral();
  }, [kelpAnimate, reset]);

  return (
    <div
      ref={kelpScope}
      style={{
        position: 'absolute',
        zIndex: 1000,
        width: '70%',
        left: 200,
        bottom: 0,
      }}
    >
      <svg viewBox="0 0 300 300" width="100%" style={{}}>
        <path
          className="skeleton border"
          fill={color}
          opacity={cellOpacity}
          d="
        M-10,300 l100 -100 l120 0 l100 100 z"
        />
        <path
          className="skeleton"
          fill="white"
          opacity="1.000000"
          d="
        M0,300 l100 -100 l100 0 l100 100 z"
        />
        <path
          className="body border"
          fill={color}
          opacity={cellOpacity}
          d="
        M90,200 l0,-100 l120,0 l0,100 z"
        />
        <path
          className="body"
          fill="pink"
          opacity={bodyOpacity}
          d="
       M100 200V100H200V200z "
        />
        <path
          className="body below dead"
          fill="#70cfed"
          d="
       M100 200 v40h30V206Q130 201 133 200h36Q173 200 173 204v36h27V200z"
        />
        <path
          className="body below"
          fill="pink"
          opacity={bodyOpacity}
          d="
       M100 200 v40h30V206Q130 201 133 200h36Q173 200 173 204v36h27V200z"
        />
        <path
          className="mouth"
          fill="#f59fad"
          opacity={bodyOpacity}
          d="
M145 192Q128 192 128 171V148Q121 123 128 120h12v-15Q140 103 142 103h19Q163 103 163 105v15h13Q183 120 179 148V170Q177 192 163 192z"
        />
        {[100, 120, 140].map((x, idx) => (
          <g>
            {/* mirror */}
            <path
              className="tentacule"
              fill="pink"
              opacity={bodyOpacity}
              d={'m' + x + ' 100q-23-22-28-50l8 0q2 21 42 50z'}
              transform="scale(-1,1)"
              transform-origin="center"
            />
            {/* mirror */}
            <circle
              className="tentacule top"
              cx={x - 22}
              cy={55 + -idx * 4}
              fill="pink"
              opacity={bodyOpacity}
              r={7}
              transform="scale(-1,1)"
              transform-origin="center"
            />
            <path
              className="tentacule"
              fill="pink"
              opacity={bodyOpacity}
              d={'m' + x + ' 100q-23-22-28-50l8 0q2 21 42 50z'}
            />
            <circle
              className="tentacule top"
              cx={x - 22}
              cy={55 + -idx * 4}
              fill="pink"
              opacity={bodyOpacity}
              r={7}
            />
          </g>
        ))}
        {[115, 125, 140, 151, 160].map((y) => (
          <>
            <rect
              className="cell"
              x="90"
              y={y}
              width="10"
              height="10"
              fill={color}
              stroke="grey"
              opacity={cellOpacity}
              strokeWidth="0.5"
              rx="3"
              ry="3"
            />
            <motion.g className={`un${y % 2}`} x={0} y={0}>
              <motion.circle
                cx={90 + 4}
                cy={y + 4}
                fill="green"
                stroke={'lightgreen'}
                r={3}
              />
            </motion.g>
          </>
        ))}
      </svg>

      {/* <Polype
        strokeColor="orange"
        zCellFill={color}
        cellOpacity={cellOpacity}
        bodyOpacity={bodyOpacity}
      /> */}
    </div>
  );
};

export default MicroCoral;
