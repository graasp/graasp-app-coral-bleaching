import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { DialogContent, Fab, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { View } from '@/config/types';
import { useContext, useSetView } from '@/utils/hooks';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/function-component-definition
export function SettingsButton() {
  const [open, setOpen] = useState(false);
  const {
    data: { view },
  } = useContext();
  const { mutate: setView } = useSetView();

  const handleClickOpen = () => {
    setOpen(true);
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
        </DialogContent>
      </Dialog>
      <Fab sx={{ position: 'absolute' }} onClick={handleClickOpen}>
        <EditIcon />
      </Fab>
    </>
  );
}
