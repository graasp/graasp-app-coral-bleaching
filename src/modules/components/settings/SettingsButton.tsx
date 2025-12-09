import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { DialogContent, Fab, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { View } from '@/config/types';
import {
  useContext,
  useReset,
  useSetAnimation,
  useSetShowStatus,
  useSetView,
} from '@/utils/hooks';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/function-component-definition
export function SettingsButton() {
  const [open, setOpen] = useState(false);
  const {
    data: { view, showStatus },
  } = useContext();

  const { mutate: setShowStatus } = useSetShowStatus();
  const { mutate: setView } = useSetView();
  const { mutate: reset } = useReset();

  const handleClickOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>Macro</Typography>
            <Switch
              checked={view !== View.Macro}
              onChange={(e) => {
                setView(e.target.checked ? View.Micro : View.Macro);
              }}
            />
            <Typography>Micro</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>Show status</Typography>
            <Switch
              checked={showStatus}
              onChange={(e) => {
                setShowStatus(e.target.checked);
              }}
            />
          </Stack>
        </DialogContent>
      </Dialog>
      <Fab
        sx={{ position: 'absolute', right: 0, m: 2 }}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Fab>
    </>
  );
}
