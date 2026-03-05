import { ReactNode } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';

import { useAnimation } from '@/utils/hooks';

import { MicroCoralIcon } from '../components/MicroCoralIcon';
import { Background } from '../components/elements/Background';
import { Sunshine } from '../components/elements/Sunshine';
import { Polyp } from './Polyp';

// eslint-disable-next-line react/function-component-definition
export function MicroView({
  width,
  height,
}: Readonly<{
  width: number;
  height: number;
}>): ReactNode {
  const { data: isPlaying } = useAnimation();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));

  const styleBySize = (() => {
    switch (true) {
      case isSm:
      case isMd:
      case isLg:
        return { left: '16%', width: '70%' };
      default:
        return { left: '22%', width: '50%' };
    }
  })();

  return (
    <>
      <svg width={width} height={height}>
        <Background width={width} height={height} isPlaying={isPlaying} />
        <Sunshine width={width} height={height} />
      </svg>
      <Polyp style={{ position: 'absolute', bottom: 190, ...styleBySize }} />
      <MicroCoralIcon />
    </>
  );
}
