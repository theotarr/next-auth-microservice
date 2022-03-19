import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import HelloWorld from '@src/components/HelloWorld'
import Head from 'next/head'

const Home = () => {
  const { data: session } = useSWR(`${process.env.NEXTAUTH_URL}/api/auth/session`)

  return <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <HelloWorld />
      <div className="bg-yellow-200 h-12 w-12 text-black">
      <h1>
        {session?.user?.email}
      </h1>
      <br />
      <a href={process.env.NEXTAUTH_URL + '/api/auth/signin?redirectCallback=http://localhost:3000'}>
        signIn
      </a>
      </div>
    </main>
  </div>
}

export default Home