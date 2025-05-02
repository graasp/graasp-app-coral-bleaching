import { JSX, createRef, useEffect } from 'react';

import { View } from '@/config/types';
import {
  useAnimation,
  useContext,
  useStageDimensions,
  useUpdateTime,
} from '@/utils/hooks';

import i18n, { DEFAULT_LANGUAGE } from '../../config/i18n';
import Coral from '../components/coral/Coral';
import MicroCoral from '../components/coral/MicroCoral';
import { SettingsButton } from '../components/settings/SettingsButton';
import { Thermometer } from '../components/thermometer/Thermometer';
import MacroView from './MacroView';
import MicroView from './MicroView';

const App = (): JSX.Element => {
  const { data } = useContext();
  const interval = createRef();
  const { data: stageDimensions } = useStageDimensions();
  const { mutate: updateTime } = useUpdateTime();
  const { data: isPlaying } = useAnimation();

  // const checkSize = (): void => {
  //   const stageWidth = window?.innerWidth || 0;
  //   const stageHeight = window?.innerHeight || 0;
  //   setStageDimensions({ width: stageWidth, height: stageHeight });
  // };

  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        updateTime();
      }, 100);
      // checkSize();
      // const ro = new ResizeObserver(() => {
      //   checkSize();
      // });
      // ro.observe(document.querySelector(`#container`));

      return () => {
        clearInterval(interval.current);
      };
    }
    clearInterval(interval.current);
  }, [isPlaying]);

  // useEffect(() => {
  //   // handle a change of language
  //   const lang = context?.lang ?? DEFAULT_LANGUAGE;
  //   if (i18n.language !== lang) {
  //     i18n.changeLanguage(lang);
  //   }
  // }, [context]);

  return (
    <>
      <Thermometer />
      <SettingsButton />

      {/* TODO move in macro */}
      {data.view === View.Macro ? (
        <>
          <MacroView
            width={stageDimensions.width}
            height={stageDimensions.height}
          />
          <Coral
            offsetX={200}
            offsetY={20}
            height={700}
            coralColor="#800000"
            deathSpeed={3}
            initialKelpAmount={80}
            id="3"
          />
          <Coral offsetX={500} offsetY={30} height={550} id={1} />
          <Coral
            offsetX={150}
            offsetY={20}
            height={400}
            coralColor="#ffa500"
            deathSpeed={10}
            id="2"
          />
        </>
      ) : (
        <>
          <MicroView
            width={stageDimensions.width}
            height={stageDimensions.height}
          />
          <MicroCoral />
        </>
      )}
    </>
  );
};

export default App;
