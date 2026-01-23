import { Typography, useTheme } from '@mui/material';

export function StatusLabel({
  scale,
  name,
  kelpAmount,
  left,
  bottom,
  status,
  color,
  offsetLeft = 0,
  bottomOffset = 0,
}) {
  const theme = useTheme();

  console.log(left);

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
      }}
    >
      <Typography variant="body1" fontWeight={'bold'} color={color}>
        {name}
      </Typography>
      {status}: {kelpAmount.toFixed(0)}%
    </div>
  );
}
