import React from 'react'
import { SessionProvider } from 'next-auth/react'

import { AppProps } from 'next/app'
import '../../styles/globals.css'


const MyApp = ({ Component, pageProps }: AppProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SessionProvider
    session={pageProps.session}
    basePath={process.env.NEXTAUTH_URL + '/api/auth'}
  >
    <Component {...pageProps} />
  </SessionProvider>
)

export default MyApp
