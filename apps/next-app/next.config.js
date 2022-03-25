const withTM = require('next-transpile-modules')(['ui'])
const env = require('dotenv').config({ path: '../../.env' }).parsed

module.exports = withTM({
  reactStrictMode: true,
  env: {
    ...env,
  },
})
