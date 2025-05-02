import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';
import { grey, orange, pink } from '@mui/material/colors';
import { StyledEngineProvider } from '@mui/material/styles';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import i18nConfig from '@/config/i18n';

import Debug from './Debug';
import App from './main/App';

// declare the module to enable theme modification
declare module '@mui/material/styles' {
  interface Theme {
    status: { danger: { background: string; color: string } };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: { danger?: { background: string; color: string } };
  }

  interface PaletteOptions {
    default: string;
  }
}

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: { main: '#5050d2' },
    secondary: pink,
    default: grey['500'],
    background: { default: 'transparent', paper: '#fff' },
  },
  status: { danger: { background: orange['400'], color: '#fff' } },
});

const RootDiv = styled('div')({ flexGrow: 1, height: '100%' });

const Root = (): ReactNode => (
  <RootDiv>
    {/* Used to define the order of injected properties between JSS and emotion */}
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <I18nextProvider i18n={i18nConfig}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />

            <App />
            {import.meta.env.DEV && (
              <>
                <ReactQueryDevtools position="bottom" />
                <Debug />
              </>
            )}
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </RootDiv>
);

export default Root;
