import { JSX } from 'react';

import { View } from '@/config/types';
import { useSetView } from '@/utils/hooks';

import { ScanSearch } from './icons/ScanSearch';

export const LensIcon = ({
  style,
}: {
  style?: React.CSSProperties;
}): JSX.Element => {
  const { mutate: setView } = useSetView();

  return (
    <button
      type="button"
      style={{
        ...style,
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        borderRadius: 10,
        cursor: 'zoom-in',
      }}
      onClick={() => {
        setView(View.Micro);
      }}
    >
      <ScanSearch size={50} />
    </button>
  );
};
