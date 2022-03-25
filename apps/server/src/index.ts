import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './lib/prisma'
import NextAuth from './auth'

dotenv.config({ path: '../../.env' })

const app = express()
const port = process.env.PORT || 4000

// Next Auth cookie configuration
const useSecureCookies =
  process?.env?.NEXTAUTH_URL?.startsWith('https://') ?? false
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = 'localhost'

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:4000',
    'https://www.latindictionary.io',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: [
    'X-Requested-With',
    'Access-Control-Allow-Headers',
    'Origin',
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version',
    'X-Auth-Token',
    'Authorization',
  ],
}

const nextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: hostName === 'localhost' ? hostName : `.${hostName}`, // add a . in front so that subdomains are included
      },
    },
  },
}

app.use(cors(corsOptions))
// @ts-expect-error - ts thinks sameSite is not a valid option for cookieOptions
app.use(NextAuth(nextAuthOptions))

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`),
)
