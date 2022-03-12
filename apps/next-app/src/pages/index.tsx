import React from 'react'

import HelloWorld from '@src/components/HelloWorld'
import Head from 'next/head'
import { CoolInterface } from 'server/src/lib/CoolInterface'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const coolKid: CoolInterface = {
  amICool: false,
}

const Auth = () => {
  const { data: session, status } = useSession()
  return (
    <>
      <h1>
        {process.env.NEXT_PUBLIC_NEXTAUTH_URL}: {status}
      </h1>
      <br />
      <a
        href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/auth/signin?redirectCallback=http://localhost:3000/`}
      >
        Sign In
      </a>
    </>
  )
}

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <HelloWorld />
      <div className="bg-yellow-200 h-12 w-12 text-black">
        <Auth />
      </div>
    </main>
  </div>
)

export default Home
