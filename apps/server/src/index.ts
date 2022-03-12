import cors from 'cors'
import express from 'express'
import NextAuth from './auth'
import GithubProvider from 'next-auth/providers/github'
import prisma from 'prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

require('dotenv').config({ path: '../../.env.local' })

const app = express()
const port = process.env.PORT || 4000
app.use(
  cors({
    origin: '*',
  }),
)

app.use(
  NextAuth({
    // adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    secret: process.env.SECRET,
  }),
)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
