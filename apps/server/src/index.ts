import cors from 'cors'
import express from 'express'
import NextAuth from './auth'
import GithubProvider from 'next-auth/providers/github'
// import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'


// import environment variables
require('dotenv').config({ path: '../../.env.local' })

const app = express()
const port = process.env.PORT || 4000


process.env.NEXTAUTH_URL = `http://localhost:${port}`
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
  }),
)

const useSecureCookies = process.env.NEXTAUTH_URL.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = 'localhost'

app.use(
  NextAuth({
    // adapter: PrismaAdapter(PrismaClient()),
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
          domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
        }
      },
    },
  }),
)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
