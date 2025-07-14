import { ReactNode } from 'react';

import Coral from '../components/coral/Coral';
import Background from '../components/elements/Background';
import { Sunshine } from '../components/elements/Sunshine';

// eslint-disable-next-line react/function-component-definition
function MacroView({
  width,
  height,
}: {
  width: number;
  height: number;
}): ReactNode {
  return (
    <>
      <svg width={width} height={height}>
        <Background width={width} height={height} withSand />
        <Sunshine width={width} height={height} />
      </svg>
      <Coral
        offsetX={200}
        offsetY={20}
        height={700}
        coralColor="#800000"
        deathSpeed={1}
        initialKelpAmount={80}
        id="3"
      />
      <Coral offsetX={500} offsetY={30} height={550} id={1} />
      <Coral
        offsetX={150}
        offsetY={20}
        height={400}
        coralColor="#ffa500"
        deathSpeed={2}
        id="2"
      />
    </>
  );
}

export default MacroView;
