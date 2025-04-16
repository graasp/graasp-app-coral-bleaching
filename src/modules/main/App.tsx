import { JSX, createRef, useEffect, useRef } from 'react';
import { Layer, Stage } from 'react-konva';

import { Fab } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';

import { View } from '@/config/types';
import {
  useAnimation,
  useSetKelpAmount,
  useStageDimensions,
  useView,
} from '@/utils/hooks';

import i18n, { DEFAULT_LANGUAGE } from '../../config/i18n';
import { SettingsButton } from '../components/settings/SettingsButton';
import Thermometer from '../components/thermometer/Thermometer';
import MacroView from './MacroView';
import MicroView from './MicroView';

const App = (): JSX.Element => {
  const context = useLocalContext();
  const { data: view } = useView();
  const interval = createRef();
  const { data: stageDimensions } = useStageDimensions();
  const { mutate: updateKelpAmount } = useSetKelpAmount();
  const { data: isPlaying } = useAnimation();

  // const checkSize = (): void => {
  //   const stageWidth = window?.innerWidth || 0;
  //   const stageHeight = window?.innerHeight || 0;
  //   setStageDimensions({ width: stageWidth, height: stageHeight });
  // };

  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        updateKelpAmount();
      }, 1000);
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

  useEffect(() => {
    // handle a change of language
    const lang = context?.lang ?? DEFAULT_LANGUAGE;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  return (
    <>
      <SettingsButton />
      <Stage width={stageDimensions.width} height={stageDimensions.height}>
        <Layer>
          {view === View.Macro ? (
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
          <Thermometer />
        </Layer>
      </Stage>
    </>
  );
};

export default App;
