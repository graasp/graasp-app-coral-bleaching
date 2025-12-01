import { JSX, createRef, useEffect } from 'react';

import { View } from '@/config/types';
import {
  useAnimation,
  useContext,
  useStageDimensions,
  useUpdateTime,
} from '@/utils/hooks';

import i18n, { DEFAULT_LANGUAGE } from '../../config/i18n';
import Controls from '../Controls';
import DayGraph from '../DayGraph';
import Debug from '../Debug';
import { SettingsButton } from '../components/settings/SettingsButton';
import { Thermometer } from '../components/thermometer/Thermometer';
import Footer from './Footer';
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
      <Debug />
      <Footer />
      <Thermometer />
      <SettingsButton />

      {/* TODO move in macro */}
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
    </>
  );
};

export default App;
