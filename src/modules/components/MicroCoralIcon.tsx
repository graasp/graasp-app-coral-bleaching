import { JSX } from 'react';

import { View } from '@/config/types';
import { useSetView } from '@/utils/hooks';

import CoralRose from './coral/corailrose.svg';

export const MicroCoralIcon = (): JSX.Element => {
  const { mutate: setView } = useSetView();

  return (
    <button
      type="button"
      style={{
        background: 'rgba(255,255,255,0.2)',
        position: 'absolute',
        right: 0,
        marginRight: 10,
        bottom: 210,
        width: 100,
        padding: 10,
        border: '1px solid darkgrey',
        borderRadius: 10,
        cursor: 'zoom-out',
      }}
      onClick={() => {
        setView(View.Macro);
      }}
    >
      <img alt="pink coral icon" src={CoralRose} width="100%" />
    </button>
  );
};
