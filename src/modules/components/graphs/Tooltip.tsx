import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { TooltipContentProps } from 'recharts';

import { humanizeDays } from './utils';

export const Tooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>): JSX.Element | null => {
  const { t } = useTranslation();
  const isVisible = Boolean(active && payload && payload.length);

  const data = payload[0];

  if (!data) {
    return null;
  }

  const humanizedLabel = humanizeDays(data.payload.t);

  return (
    <div
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        backgroundColor: 'white',
        padding: '2px',
        border: '1px solid #ccc',
      }}
    >
      {isVisible && (
        <>
          {label && <div>{humanizedLabel}</div>}
          <div style={{ fontWeight: 'bold' }}>
            {`${payload[0].value.toFixed(1)}°C`}{' '}
          </div>
          {data.payload.death && (
            <p>
              {t('DEATH_INDICATION', { names: data.payload.names.join(', ') })}
            </p>
          )}
        </>
      )}
    </div>
  );
};
