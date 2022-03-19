import { Router } from 'express'
import cookieParser from 'cookie-parser'
import { json, urlencoded } from 'body-parser'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { IncomingMessage, ServerResponse } from 'http'

const authActions =
  /^\/api\/auth\/(session|signin\/?\w*|signout|csrf|providers|callback\/\w+|_log)$/
const router = Router()

/**
 * Compatibility layer for `next-auth` for `express` apps.
 * Should match the following paths:
 * /api/auth/signin
 * /api/auth/signin/:provider
 * /api/auth/callback/:provider
 * /api/auth/signout
 * /api/auth/session
 * /api/auth/csrf
 * /api/auth/providers
 * /api/auth/_log
 *
 * See: https://next-auth.js.org/getting-started/rest-api
 * @param options - Options for NextAuth
 */
export default function NextAuthMiddleware(options: NextAuthOptions) {
  return router
    .use(urlencoded({ extended: false }))
    .use(json())
    .use(cookieParser())
    .all(authActions, (req: IncomingMessage, res: ServerResponse, next) => {
      if (req.method !== 'POST' && req.method !== 'GET') return next()

      // @ts-expect-error - next-auth reqs have a `query` property while the express reqs don't
      req.query.nextauth = req.path.split('/').slice(3)
      // @ts-expect-error - next-auth reqs have a `query` property while the express reqs don't
      if (req.query.redirectCallback) {
        options.callbacks = {
          redirect() {
            // @ts-ignore
            return req.query.redirectCallback
          },
        }
      }
      // @ts-expect-error - next-auth expects a `req` object
      return NextAuth(req, res, options)
    })
}
