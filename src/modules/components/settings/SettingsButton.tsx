import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  DialogActions,
  DialogContent,
  Fab,
  Stack,
} from '@mui/material';
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
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    data: { view, showStatus },
  } = useContext();

  const { mutate: setShowStatus } = useSetShowStatus();
  const { mutate: setView } = useSetView();
  const { mutate: reset } = useReset();
  const { mutate: setAnimation } = useSetAnimation();

  const handleClickOpen = (): void => {
    setOpen(true);
    setAnimation(false);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{t('Settings')}</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>{t('Macro')}</Typography>
            <Switch
              checked={view !== View.Macro}
              onChange={(e) => {
                setView(e.target.checked ? View.Micro : View.Macro);
                reset();
              }}
            />
            <Typography>{t('Micro')}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography>{t('Show status')}</Typography>
            <Switch
              checked={showStatus}
              onChange={(e) => {
                setShowStatus(e.target.checked);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('Close')}</Button>
        </DialogActions>
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
