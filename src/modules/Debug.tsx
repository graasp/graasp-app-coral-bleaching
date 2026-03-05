/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button } from '@mui/material';

import { useReset } from '@/utils/hooks';

const Debug = () => {
  const { mutate: reset } = useReset();

  return (
    <div style={{ position: 'absolute', top: 0, right: 200, zIndex: 1000000 }}>
      <br />
      <Button title="reset" onClick={() => reset()}>
        Reset
      </Button>
    </div>
  );
};

export default Debug;
