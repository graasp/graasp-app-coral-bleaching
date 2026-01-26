import { ReactNode } from 'react';

import { useAnimation } from '@/utils/hooks';

import PinkCoral from '../components/coral/PinkCoral';
import PurpleCoral from '../components/coral/PurpleCoral';
import YellowCoral from '../components/coral/YellowCoral';
import CoralRose from '../components/coral/corailrose.svg';
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
        <Background width={width} height={height} isPlaying={isPlaying} />
        <path
          d={`
    M0 ${height - height * 0.45} 
    Q ${width * 0.15} ${height - height * 0.49}, ${width * 0.3} ${height - height * 0.45} 
    Q ${width * 0.75} ${height - height * 0.435}, ${width} ${height - height * 0.45} 
    L ${width} ${height} 
    L 0 ${height} 
    Z
  `}
          fill="#f7dc6b"
        />

        {isPlaying && <Sunshine width={width} height={height} />}
      </svg>

      {/* decorative background coral */}
      <img
        style={{
          position: 'absolute',
          bottom: 350,
          // filter: 'grayscale(100%)',
          opacity: 0.15,
          left: 20,
        }}
        src={CoralRose}
        width={350}
      />
      <img
        style={{
          position: 'absolute',
          bottom: 350,
          // filter: 'grayscale(100%)',
          opacity: 0.15,
          right: 100,
          transform: 'scale(-1, 1)',
        }}
        src={CoralRose}
        width={330}
      />

      {/* corals */}
      <PinkCoral
        initialKelpAmount={80}
        scale="50%"
        style={{
          position: 'absolute',
          bottom: 340,
          left: '12%',
          transform: 'scale(-1, 1)',
        }}
        offsetLeft={19.5}
        bottomOffset={125}
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
        offsetLeft={9.5}
        bottomOffset={125}
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
        offsetLeft={17.5}
        bottomOffset={125}
      />
      <PinkCoral
        initialKelpAmount={80}
        scale="22%"
        style={{ position: 'absolute', bottom: 280, left: '70%' }}
        offsetLeft={13.5}
        bottomOffset={115}
      />

      <YellowCoral
        initialKelpAmount={80}
        scale="50%"
        style={{
          position: 'absolute',
          bottom: 290,
          left: '25%',
        }}
        offsetLeft={22}
        bottomOffset={70}
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
        offsetLeft={6}
        bottomOffset={20}
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
        offsetLeft={10}
        bottomOffset={25}
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
        offsetLeft={0}
        bottomOffset={100}
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
        offsetLeft={9.5}
        bottomOffset={25}
      />
      <PurpleCoral
        initialKelpAmount={80}
        scale="9%"
        style={{
          position: 'absolute',
          bottom: 230,
          left: '19%',
          filter: 'hue-rotate(-10deg)',
          transform: 'scale(-1,1)',
        }}
        offsetLeft={-2}
        bottomOffset={80}
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
        offsetLeft={1}
        bottomOffset={0}
      />
      <PurpleCoral
        initialKelpAmount={80}
        scale="20%"
        style={{ position: 'absolute', bottom: 180, left: '42%' }}
        offsetLeft={4}
        bottomOffset={30}
      />
    </>
  );
}

export default MacroView;
