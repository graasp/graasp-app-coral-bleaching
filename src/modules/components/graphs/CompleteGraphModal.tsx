import { JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Button, DialogActions, IconButton, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { useSetAnimation } from '@/utils/hooks';

import { CompleteGraph } from './CompleteGraph';

const backgroundColor = 'rgba(200, 200, 200, 0.5)';

// eslint-disable-next-line react/function-component-definition
export default function CompleteGraphModal(): JSX.Element {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { mutate: setAnimation } = useSetAnimation();

  const handleClickOpen = (): void => {
    setAnimation(false);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={t('View graph in fullscreen')}>
        <IconButton
          onClick={() => handleClickOpen()}
          sx={{ background: backgroundColor }}
        >
          <FullscreenIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Dialog maxWidth="lg" onClose={handleClose} open={open}>
        <DialogTitle>{t('Temperature over time')}</DialogTitle>
        <CompleteGraph />
        <DialogActions>
          <Button onClick={handleClose}>{t('Close')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
