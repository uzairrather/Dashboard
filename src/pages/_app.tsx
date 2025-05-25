import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { setAuthFromStorage } from '../features/auth/authSlice';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(setAuthFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
