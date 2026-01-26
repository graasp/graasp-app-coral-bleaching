/* eslint-disable @typescript-eslint/explicit-function-return-type */
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, IconButton, Stack } from '@mui/material';

import { View } from '@/config/types';
import {
  useAnimation,
  useContext,
  useReset,
  useSetAnimation,
} from '@/utils/hooks';

const backgroundColor = 'rgba(200, 200, 200, 0.5)';

const Debug = () => {
  // const { data: kelpAmount } = useKelpAmount();
  const { data: isPlaying } = useAnimation();
  const { mutate: reset } = useReset();
  const {
    data: { view },
  } = useContext();

  // const { data: growthScale } = useGrowthScale();
  const { mutate: setAnimation } = useSetAnimation();
  // const { data: isDead } = useIsDead();

  return (
    <Stack>
      <Stack direction="column" alignItems="center" spacing={1} mb={1}>
        {isPlaying ? (
          <span>
            <IconButton
              title="pause"
              onClick={() => setAnimation(false)}
              sx={{ background: backgroundColor }}
              color="warning"
            >
              <PauseIcon fontSize="large" />
            </IconButton>
          </span>
        ) : (
          <span>
            <IconButton
              title="play"
              onClick={() => setAnimation(true)}
              sx={{ background: backgroundColor }}
              color="success"
            >
              <PlayArrowIcon fontSize="large" />
            </IconButton>
          </span>
        )}
        <Stack direction="row" gap={1}>
          <IconButton
            title="reset"
            onClick={() => reset()}
            sx={{ background: backgroundColor }}
          >
            <RestartAltIcon fontSize="medium" />
          </IconButton>
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
