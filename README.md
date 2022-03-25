# Next Auth As A Microservice

This is an example of how to use Next Auth as a microservice and inside a monorepo. Basically I've built a custom backend Express wrapper of Next Auth that handles authentication and any other things you may need.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `next-app`: a [Next.js](https://nextjs.org) app
- `server`: an express backend wrapper of [Next Auth.js](https://next-auth.js.org)
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Tech Stack

Front-end:

- Next.js for the web app (`next-app`)
- Tailwind CSS for styling

Back-end:

- Express.js for the server
- Next-Auth.js for authentication
- Prisma with a PostgreSQL database for storing data

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This repository is used in the `npx create-turbo` command, and selected when choosing which package manager you wish to use with your monorepo (Yarn).

### Build

To build all apps and packages, run the following command:

```
cd next-auth-microservice
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd next-auth-microservice
yarn run dev
```
