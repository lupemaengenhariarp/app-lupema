import React, { useEffect } from 'react';
import '../styles/globals.css';
import './v3rsojk/verso.css';
import type { AppProps } from 'next/app';
import LayoutApp from '../components/interface/Layout';
import MenuContextProvider from '../context/menuMobileContext';
import { QueryClientProvider, QueryClient } from 'react-query';
import TagManager from 'react-gtm-module';
import { useSearchParams } from 'next/navigation';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utms = {
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      utm_term: searchParams.get('utm_term'),
      utm_content: searchParams.get('utm_content'),
    };

    Object.entries(utms).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(key, value);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    const TagManagerArgs = {
      gtmId: 'GTM-NJTPCVC',
    };

    TagManager.initialize(TagManagerArgs);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MenuContextProvider>
        <LayoutApp ApiData={pageProps}>
          <Component {...pageProps} />
        </LayoutApp>
      </MenuContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
