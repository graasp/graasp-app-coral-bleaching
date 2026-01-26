import * as React from 'react';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Button, DialogActions, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { useSetAnimation } from '@/utils/hooks';

import { CompleteGraph } from './CompleteGraph';

const backgroundColor = 'rgba(200, 200, 200, 0.5)';

export default function CompleteGraphModal() {
  const [open, setOpen] = React.useState(false);
  const { mutate: setAnimation } = useSetAnimation();

  const handleClickOpen = () => {
    setAnimation(false);
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <IconButton
        title="fullscreen"
        onClick={() => handleClickOpen()}
        sx={{ background: backgroundColor }}
      >
        <FullscreenIcon fontSize="medium" />
      </IconButton>
      <Dialog
        // sx={{ width: '100%' }}
        maxWidth="lg"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>Temperature over time</DialogTitle>
        <CompleteGraph />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
