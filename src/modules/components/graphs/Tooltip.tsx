import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import type { TooltipPayload } from 'recharts';

import { humanizeDays } from './utils';

export const Tooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: TooltipPayload;
  label?: string | number;
}): JSX.Element | null => {
  const { t } = useTranslation();
  const isVisible = Boolean(active && payload?.length);

  const data = payload[0];

  if (!data) {
    return null;
  }

  const humanizedLabel = humanizeDays(data.payload.t);

  const temperatureValue = (data.value as number).toFixed(1);

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
          {label !== undefined && <div>{humanizedLabel}</div>}
          <div style={{ fontWeight: 'bold' }}>{`${temperatureValue}°C`} </div>
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
