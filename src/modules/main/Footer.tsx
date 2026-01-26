import { Stack } from '@mui/material';

import { useReset } from '@/utils/hooks';

import Controls from '../Controls';
import DayGraph from '../DayGraph';
import CompleteGraphModal from '../components/completeGraph/CompleteGraphModal';

const Footer = () => {
  return (
    <Stack
      px={2}
      py={2}
      style={{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Stack
        borderRadius={5}
        justifyContent="center"
        direction="row"
        p={2}
        style={{
          width: '100%',
          background: 'white',
        }}
      >
        <Controls />
        <DayGraph />
        <span>
          <CompleteGraphModal />
        </span>
      </Stack>
    </Stack>
  );
};

export default Footer;
