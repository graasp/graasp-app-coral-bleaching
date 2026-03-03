import { JSX } from 'react';

import { Typography, useTheme } from '@mui/material';

import { CoralStatus, useAnimation } from '@/utils/hooks';

const getBorderColor = (status: CoralStatus): string => {
  switch (status) {
    case CoralStatus.Normal:
      return 'gold';
    case CoralStatus.Growing:
      return 'green';
    case CoralStatus.Dying:
      return 'red';
    case CoralStatus.Dead:
      return 'darkgrey';
    default:
      return 'black';
  }
};

export const StatusLabel = ({
  name,
  kelpAmount,
  left,
  bottom = 0,
  status,
  color,
  offsetLeft = 0,
  bottomOffset = 0,
}: {
  name: string;
  kelpAmount: number;
  left?: string | number;
  bottom?: number;
  status: CoralStatus;
  color: string;
  offsetLeft: number;
  bottomOffset?: number;
}): JSX.Element => {
  const theme = useTheme();

  const { data: isPlaying } = useAnimation();
  const borderColor = isPlaying ? getBorderColor(status) : 'transparent';
  const textColor = status === CoralStatus.Dead ? 'grey' : color;

  return (
    <div
      style={{
        zIndex: 30,
        position: 'absolute',
        left: `calc(${left} + ${offsetLeft}%)`,
        bottom: bottom + bottomOffset,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        background: 'white',
        borderRadius: '5px',
        border: '3px solid black',
        borderColor,
      }}
    >
      <Typography variant="body1" fontWeight="bold" color={textColor}>
        {name}: {kelpAmount.toFixed(0)}%
      </Typography>
    </div>
  );
};
