import { ReactNode } from 'react';

import { useAnimation } from '@/utils/hooks';

import PinkCoral from '../components/coral/PinkCoral';
import PurpleCoral from '../components/coral/PurpleCoral';
import YellowCoral from '../components/coral/YellowCoral';
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
  const { data: isPlaying } = useAnimation();

  return (
    <>
      <svg width={width} height={height}>
        <Background
          width={width}
          height={height}
          withSand
          isPlaying={isPlaying}
        />
        {isPlaying && <Sunshine width={width} height={height} />}
      </svg>

      <PinkCoral
        initialKelpAmount={80}
        scale="50%"
        style={{ position: 'absolute', bottom: 200, left: '20%' }}
      />
      <YellowCoral
        initialKelpAmount={80}
        scale="40%"
        style={{ position: 'absolute', bottom: 200, left: '70%' }}
      />
      <PurpleCoral
        initialKelpAmount={80}
        scale="20%"
        style={{ position: 'absolute', bottom: 200, left: '60%' }}
      />
    </>
  );
}

export default MacroView;
