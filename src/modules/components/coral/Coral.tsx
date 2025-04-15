import { ReactNode } from 'react';
import { Circle, Line } from 'react-konva';

// eslint-disable-next-line react/function-component-definition
function Coral(): ReactNode {
  const color = '#8E1325';

  const points = [
    [0, 0],
    [20, 80],
    [60, 130],
    [140, 200],
    [180, 300],
  ];

  const offsetX = 200;
  const offsetY = 400;

  return (
    <>
      <Line
        x={offsetX}
        y={offsetY}
        points={points.flatMap((i) => i)}
        tension={0.8}
        stroke={color}
        strokeWidth={25}
      />
      {points.map((p) => (
        <Circle
          x={offsetX + p[0]}
          y={offsetY + p[1]}
          radius={6}
          fill="black"
          strokeWidth={4}
        />
      ))}
    </>
  );
}

export default Coral;
