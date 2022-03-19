import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { AppProps } from 'next/app'
import '../../styles/globals.css'


const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider
    session={pageProps.session}
    basePath='http://localhost:4000/api/auth'
  >
    <SWRConfig

      value={{
        refreshInterval: 5000,
        fetcher: (url, headers) => fetch(url, { headers, credentials: 'include' }).then((res) => res.json()),
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
    </SWRConfig>
  </SessionProvider>
)

export default MyApp
