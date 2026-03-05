import { JSX } from 'react';

import CoralRose from './coral/corailrose.svg';
import { ScanSearch } from './icons/ScanSearch';

export const MicroCoralIcon = (): JSX.Element => (
  <div
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
    }}
  >
    <img alt="pink coral icon" src={CoralRose} width="100%" />
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScanSearch size={70} />
    </div>
  </div>
);
