import { JSX, useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';

import { useLocalContext } from '@graasp/apps-query-client';

import i18n, { DEFAULT_LANGUAGE } from '../../config/i18n';
import Thermometer from '../components/thermometer/Thermometer';
import MacroView from './MacroView';

const App = (): JSX.Element => {
  const context = useLocalContext();
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const checkSize = (): void => {
    const stageWidth = window?.innerWidth || 0;
    const stageHeight = window?.innerHeight || 0;
    setStageDimensions({ width: stageWidth, height: stageHeight });
    console.log(stageHeight, stageWidth);
  };

  useEffect(() => {
    checkSize();
    // const ro = new ResizeObserver(() => {
    //   checkSize();
    // });
    // ro.observe(document.querySelector(`#container`));
  }, []);

  useEffect(() => {
    // handle a change of language
    const lang = context?.lang ?? DEFAULT_LANGUAGE;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  return (
    <Stage width={stageDimensions.width} height={stageDimensions.height}>
      <Layer>
        <MacroView
          width={stageDimensions.width}
          height={stageDimensions.height}
        />
        <Thermometer stageHeight={stageDimensions.height} />
      </Layer>
    </Stage>
  );
};

export default App;
