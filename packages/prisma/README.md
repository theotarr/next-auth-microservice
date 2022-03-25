# Prisma Package

This package stores the global prisma schema for the server and web apps so everything can share the same database. There are some caveats for how this schema is kept in sync between each app.

My `prisma` package is not a regular **_package_**, as in the does not provide shared code to each app, instead each app that requires prisma must use the `prisma` and `@prisma/client` dependencies.
