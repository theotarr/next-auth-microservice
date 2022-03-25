import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PrismaClient, User } from '@prisma/client'

const Home = ({ users }: { users: User[] }) => {
  const { data: session } = useSWR(
    `${process.env.NEXTAUTH_URL}/api/auth/session`,
  )
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center text-black ">
        <div className="bg-yellow-200 rounded-md">
          <h1 className="font-bold">
            {session?.user?.name || 'not signed in'}
          </h1>
          <br />
          {session?.user ? (
            <a
              href={`${
                process.env.NEXTAUTH_URL
              }/api/auth/signout?redirectCallback=${
                (process.env.VERCEL_URL || `http://localhost:3000`) +
                router.asPath
              }`}
            >
              Sign out
            </a>
          ) : (
            <a
              href={`${
                process.env.NEXTAUTH_URL
              }/api/auth/signin?redirectCallback=${
                (process.env.VERCEL_URL || `http://localhost:3000`) +
                router.asPath
              }`}
            >
              Sign in
            </a>
          )}
        </div>
        <div className="bg-gray-200 w-50 h-20 mt-4 p-4 rounded-md">
          <h1 className="h1 font-bold">List Of Users ({users.length})</h1>
          {users.map(user => (
            <div key={user.id}>
              {user.name} - {user.email}
            </div>
          ))}
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
