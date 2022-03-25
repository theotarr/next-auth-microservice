import React from 'react'
import useSWR from 'swr'
import HelloWorld from '@src/components/HelloWorld'
import Head from 'next/head'
import { PrismaClient, User } from '@prisma/client'

const Home = ({ users }: { users: User[] }) => {
  const { data: session } = useSWR(
    `${process.env.NEXTAUTH_URL}/api/auth/session`,
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <HelloWorld />
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
        <div className="bg-yellow-200 h-12 w-12 text-black">
          <h1>{session?.user?.email}</h1>
          <br />
          <a
            href={`${process.env.NEXTAUTH_URL}/api/auth/signin?redirectCallback=http://localhost:3000`}
          >
            signIn
          </a>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient()
  const users = await prisma.user.findMany()
  return { props: { users } }
}
export default Home
