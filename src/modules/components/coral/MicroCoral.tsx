import { ReactNode, useEffect, useState } from 'react';

import { motion, transform, useAnimate } from 'motion/react';

import { CORAL_COLOR, DEATH_DAY } from '@/config/constants';
import { CoralStatus, useContext, useStatus } from '@/utils/hooks';

import { Polype } from './Polype';

const Steps = {
  Normal: 'normal',
  EjectKelp: 'ejectKelp',
  LooseColor: 'looseColor',
  DisappearBody: 'disappearBody',
};

// eslint-disable-next-line arrow-body-style
const MicroCoral = (): ReactNode => {
  const { dyingFactor, status } = useStatus('id');
  const [scope, animate] = useAnimate();
  const [kelpScope, kelpAnimate] = useAnimate();
  const [step, setStep] = useState(Steps.Normal);
  const {
    data: { reset },
  } = useContext();

  const returnToCoral = () => {
    kelpAnimate(`.un1`, { x: 0, y: 0 }, { duration: 1 });
    kelpAnimate(`.un0`, { x: 0, y: 0 }, { duration: 1 });
  };

  useEffect(() => {
    if (dyingFactor >= 5) {
      setStep(Steps.DisappearBody);
    } else if (dyingFactor > 2.5) {
      setStep(Steps.LooseColor);
    } else if (dyingFactor > 2) {
      setStep(Steps.EjectKelp);
    } else {
      setStep(Steps.Normal);
    }
  }, [dyingFactor, reset]);

  // 1 - eject kelp
  useEffect(() => {
    switch (step) {
      case Steps.EjectKelp:
        kelpAnimate(`.un0`, { x: -40, y: -40 }, { duration: 5 });
        break;
      case Steps.LooseColor:
        kelpAnimate(`.un1`, { x: -40, y: -40 }, { duration: 5 });
        break;
      case Steps.DisappearBody:
        break;
      default:
        returnToCoral();
    }
  }, [step]);

  // 2 - loose color
  const color = transform(
    dyingFactor,
    [2, DEATH_DAY],
    [CORAL_COLOR, '#ffffff00'],
  );
  const cellOpacity = transform(dyingFactor, [DEATH_DAY, 3], [0, 0.7]);

  // 3 - body disappear
  console.log(dyingFactor);
  const bodyOpacity = transform(dyingFactor, [DEATH_DAY, 4.5], [0, 1]);

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

        {/* background */}
        {Array.from({ length: 5 }, (v, k) => (
          <rect
            x="70"
            y={240 + 13 * k}
            width="17"
            height="10"
            rx="3"
            fill="lightgrey"
          />
        ))}
        {Array.from({ length: 5 }, (v, k) => (
          <rect
            x="112"
            y={230 + 13 * k}
            width="20"
            height="10"
            rx="3"
            fill="lightgrey"
          />
        ))}
        {Array.from({ length: 5 }, (v, k) => (
          <rect
            x="90"
            y={230 + 13 * k}
            width="20"
            height="10"
            rx="3"
            fill="lightgrey"
          />
        ))}
        {Array.from({ length: 7 }, (v, k) => (
          <rect
            x="140"
            y={212 + 13 * k}
            width="10"
            height="10"
            rx="3"
            fill="lightgrey"
          />
        ))}
        {Array.from({ length: 7 }, (v, k) => (
          <rect
            x="157"
            y={210 + 13 * k}
            width="10"
            height="10"
            rx="3"
            fill="lightgrey"
          />
        ))}
        {Array.from({ length: 5 }, (v, k) => (
          <rect
            x="192"
            y={230 + 13 * k}
            width="20"
            height="10"
            rx="3"
            fill="lightgrey"
          />
        ))}
        {Array.from({ length: 5 }, (v, k) => (
          <rect
            x="214"
            y={234 + 13 * k}
            width="18"
            height="10"
            rx="3"
            fill="lightgrey"
          />
        ))}
        {Array.from({ length: 5 }, (v, k) => (
          <rect
            x="170"
            y={230 + 13 * k}
            width="20"
            height="10"
            rx="3"
            fill="lightgrey"
          />
        ))}

        {/* ---- */}
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
    M 100 200 v 40 Q 106 278 114 205 Q 119 279 129 240 V 204 Q 130 201 133 200 h 36 Q 173 200 173 204 v 35 Q 183 279 186 203 Q 195 266 201 240 V 200 z"
        />
        <path
          className="body below"
          fill="pink"
          opacity={bodyOpacity}
          d="
   M 100 200 v 40 Q 106 278 114 205 Q 119 279 129 240 V 204 Q 130 201 133 200 h 36 Q 173 200 173 204 v 35 Q 183 279 186 203 Q 195 266 201 240 V 200 z"
        />
        {[100, 120, 140].map((x, idx) => (
          <g>
            {/* mirror */}
            <path
              className="tentacule"
              fill={x === 100 ? 'pink' : color}
              opacity={bodyOpacity - 0.3}
              d={'m' + x + ' 100q-23-22-28-50l8 0q2 21 42 50z'}
              transform="scale(-1,1)"
              transform-origin="center"
            />
            {/* mirror */}
            <circle
              className="tentacule top"
              cx={x - 22}
              cy={55 + -idx * 4}
              fill={x === 100 ? 'pink' : color}
              opacity={bodyOpacity}
              r={7}
              transform="scale(-1,1)"
              transform-origin="center"
            />
            <path
              className="tentacule"
              fill={x === 100 ? 'pink' : color}
              opacity={bodyOpacity - 0.3}
              d={'m' + x + ' 100q-23-22-28-50l8 0q2 21 42 50z'}
            />
            <circle
              className="tentacule top"
              cx={x - 22}
              cy={55 + -idx * 4}
              fill={x === 100 ? 'pink' : color}
              opacity={bodyOpacity}
              r={7}
            />
          </g>
        ))}
        <path
          className="mouth"
          fill="#f59fad"
          opacity={bodyOpacity}
          d="
M 145 192 Q 128 192 128 171 V 148 Q 121 123 128 120 q 6 0 12 0 q 12 0 0 -8 Q 121 98 148 98 h 8 Q 187 98 163 113 q -10 7 -1 7 h 13 Q 183 120 179 148 V 170 Q 177 192 163 192 z"
        />
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
                stroke="lightgreen"
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
