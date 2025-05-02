import { ReactElement } from 'react';

import {
  THERMOMETER_POSITION_X,
  THERMOMETER_RADIUS,
  THERMOMETER_WIDTH,
} from '@/config/constants';

// eslint-disable-next-line react/function-component-definition
export function ThermometerShape({
  stroke = '',
  strokeWidth = 0,
  fill = 'transparent',
  thermometerHeight,
  offsetY,
  height,
}: {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  thermometerHeight: number;
  offsetY: number;
  height: number;
}): ReactElement {
  function arcToSvgPath(
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number,
    anticlockwise = false,
  ): string {
    const startX = x + r * Math.cos(startAngle);
    const startY = y + r * Math.sin(startAngle);
    const endX = x + r * Math.cos(endAngle);
    const endY = y + r * Math.sin(endAngle);

    let deltaAngle = endAngle - startAngle;
    if (anticlockwise && deltaAngle < 0) {
      deltaAngle += 2 * Math.PI;
    } else if (!anticlockwise && deltaAngle < 0) {
      deltaAngle += 2 * Math.PI;
    }

    const largeArcFlag = deltaAngle > Math.PI ? 1 : 0;
    const sweepFlag = anticlockwise ? 0 : 1;

    return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
  }

  const totalOffset = offsetY + thermometerHeight - height; // fill, not filled, thermometerHeight

  // use trigonometry to get the exact angle matching the circle and the rectangle
  // the angle is used to draw the most perfect mercury bulb
  const angle = Math.asin(THERMOMETER_WIDTH / 2 / THERMOMETER_RADIUS);

  // compute start and end angles to draw the bulb
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  const computeStartAngle = (): number => -Math.PI / 2 + angle;

  const computeEndAngle = (): number => -angle + (3 / 2) * Math.PI;

  return (
    <>
      {/* small bug of translation */}
      <g transform="translate(0,-3)">
        <path
          d={`${arcToSvgPath(
            THERMOMETER_POSITION_X + THERMOMETER_WIDTH / 2,
            totalOffset + height + THERMOMETER_RADIUS,
            THERMOMETER_RADIUS,
            computeStartAngle(),
            computeEndAngle(),
          )}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </g>
      <path
        d={`
        M ${THERMOMETER_POSITION_X} ${totalOffset + height} 
        L ${THERMOMETER_POSITION_X} ${totalOffset} 
        L ${THERMOMETER_POSITION_X + THERMOMETER_WIDTH} ${totalOffset} 
        L ${THERMOMETER_POSITION_X + THERMOMETER_WIDTH} ${totalOffset + height} 
        `}
        strokeWidth={strokeWidth}
        stroke={stroke}
        fill={fill}
      />
    </>
  );
}
