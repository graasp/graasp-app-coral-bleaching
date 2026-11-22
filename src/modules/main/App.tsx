import { JSX, useEffect, useRef } from 'react';

import { ANIMATION_UPDATE_INTERVAL } from '@/config/constants';
import { View } from '@/config/types';
import {
  useAnimation,
  useContext,
  useSetStageDimensions,
  useStageDimensions,
  useUpdateTime,
} from '@/utils/hooks';

import { SettingsButton } from '../components/settings/SettingsButton';
import { Thermometer } from '../components/thermometer/Thermometer';
import { Footer } from './Footer';
import { MacroView } from './MacroView';
import { MicroView } from './MicroView';

const App = (): JSX.Element => {
  const { data } = useContext();
  const interval = useRef<number | undefined>(undefined);
  const { data: stageDimensions } = useStageDimensions();
  const { mutate: updateTime } = useUpdateTime();
  const { data: isPlaying } = useAnimation();
  const { mutate: setStageDimensions } = useSetStageDimensions();

  const checkSize = (): void => {
    const stageWidth = window?.innerWidth || 0;
    const stageHeight = window?.innerHeight || 0;
    setStageDimensions({ width: stageWidth, height: stageHeight });
  };

  useEffect(() => {
    checkSize();

    const ro = new ResizeObserver(() => {
      checkSize();
    });
    const root = document.querySelector(`#root`);
    if (root) {
      ro.observe(root);

      return () => {
        ro.unobserve(root);
      };
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        updateTime();
      }, ANIMATION_UPDATE_INTERVAL);

      return () => {
        if (interval.current) {
          clearInterval(interval.current);
        }
      };
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [isPlaying, updateTime]);

  return (
    <div>
      <Footer />
      <Thermometer />
      <SettingsButton />

      {data.view === View.Macro ? (
        <MacroView
          width={stageDimensions.width}
          height={stageDimensions.height}
        />
      ) : (
        <MicroView
          width={stageDimensions.width}
          height={stageDimensions.height}
        />
      )}
    </div>
  );
};

export default App;
