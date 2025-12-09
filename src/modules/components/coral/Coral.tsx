import { ReactNode } from 'react';

import { useContext, useStatus } from '@/utils/hooks';

import PinkCoral from './PinkCoral';

// eslint-disable-next-line react/function-component-definition
function Coral({
  offsetX,
  offsetY,
  height,
  deathSpeed = 1,
  initialKelpAmount,
}: Readonly<{
  offsetX: number;
  offsetY: number;
  height: number;
  deathSpeed: number;
  initialKelpAmount?: number;
  coralColor?: string;
  id: string;
}>): ReactNode {
  // const { data: isPlaying } = useAnimation();
  const { kelpAmount, status, dyingFactor } = useStatus('id', {
    initialKelpAmount,
    deathSpeed,
  });
  const {
    data: { reset },
  } = useContext();

  return (
    // fix for now
    <PinkCoral
      kelpAmount={kelpAmount}
      dyingFactor={dyingFactor}
      status={status}
      scale="70%"
      style={{ position: 'absolute', bottom: 150, left: '20%' }}
    />
  );
}

export default Coral;
