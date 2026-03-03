import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconButton, Stack, Tooltip } from '@mui/material';

import { useAnimation, useReset, useSetAnimation } from '@/utils/hooks';

const backgroundColor = 'rgba(200, 200, 200, 0.5)';

const Debug = (): JSX.Element => {
  const { data: isPlaying } = useAnimation();
  const { mutate: reset } = useReset();
  const { t } = useTranslation();

  const { mutate: setAnimation } = useSetAnimation();

  return (
    <Stack>
      <Stack direction="column" alignItems="center" spacing={1} mb={1}>
        {isPlaying ? (
          <Tooltip title={t('Pause')}>
            <IconButton
              onClick={() => setAnimation(false)}
              sx={{ background: backgroundColor }}
              color="warning"
            >
              <PauseIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={t('Play')}>
            <IconButton
              onClick={() => setAnimation(true)}
              sx={{ background: backgroundColor }}
              color="success"
            >
              <PlayArrowIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
        <Stack direction="row" gap={1}>
          <Tooltip title={t('Reset')}>
            <IconButton
              onClick={() => reset()}
              sx={{ background: backgroundColor }}
            >
              <RestartAltIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {/* <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={view}
          name="radio-buttons-group"
          onChange={(e) => {
            if (e.target.value) {
              setView(e.target.value as View);
            }
          }}
        >
          <FormControlLabel
            value={View.Macro}
            control={<Radio />}
            label="Macro"
          />
          <FormControlLabel
            value={View.Micro}
            control={<Radio />}
            label="Micro"
          />
        </RadioGroup>
      </FormControl> */}
    </Stack>
  );
};

export default Debug;
