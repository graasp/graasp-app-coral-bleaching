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
        style={{
          position: 'absolute',
          bottom: 340,
          left: '12%',
          transform: 'scale(-1, 1)',
        }}
      />
      <PinkCoral
        initialKelpAmount={80}
        scale="30%"
        style={{
          position: 'absolute',
          bottom: 280,
          left: '8%',
          filter: 'hue-rotate(13deg)',
          transform: 'scale(-1, 1)',
        }}
      />
      <PinkCoral
        initialKelpAmount={80}
        scale="45%"
        style={{
          position: 'absolute',
          bottom: 300,
          left: '45%',
          filter: 'hue-rotate(25deg)',
        }}
      />
      <PinkCoral
        initialKelpAmount={80}
        scale="22%"
        style={{ position: 'absolute', bottom: 280, left: '70%' }}
      />

      <YellowCoral
        initialKelpAmount={80}
        scale="50%"
        style={{
          position: 'absolute',
          bottom: 290,
          left: '25%',
        }}
      />
      <YellowCoral
        initialKelpAmount={80}
        scale="20%"
        style={{
          position: 'absolute',
          bottom: 250,
          left: '51%',
          filter: 'hue-rotate(-10deg)',
          transform: 'rotate(10deg)',
        }}
      />
      <YellowCoral
        initialKelpAmount={80}
        scale="30%"
        style={{
          position: 'absolute',
          bottom: 220,
          left: '62%',
          transform: 'scale(-1,1) rotate(5deg)',
        }}
      />
      <PurpleCoral
        initialKelpAmount={80}
        scale="12%"
        style={{
          position: 'absolute',
          bottom: 280,
          left: '33%',
          filter: 'hue-rotate(-10deg)',
        }}
      />
      <YellowCoral
        initialKelpAmount={80}
        scale="28%"
        style={{
          position: 'absolute',
          bottom: 235,
          left: '18%',
          transform: 'scale(-1,1) rotate(15deg)',
        }}
      />
      <PurpleCoral
        initialKelpAmount={80}
        scale="9%"
        style={{
          position: 'absolute',
          bottom: 230,
          left: '19%',
          filter: 'hue-rotate(-10deg)',
        }}
      />
      <PurpleCoral
        initialKelpAmount={80}
        scale="12%"
        style={{
          position: 'absolute',
          bottom: 230,
          left: '82%',
          filter: 'hue-rotate(-20deg)',
          transform: 'rotate(-5deg)',
        }}
      />
      <PurpleCoral
        initialKelpAmount={80}
        scale="20%"
        style={{ position: 'absolute', bottom: 180, left: '42%' }}
      />
    </>
  );
}

export default MacroView;
