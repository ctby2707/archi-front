#!/bin/sh
# Run Prisma migrations in the background
node dist/main.js &
npx prisma migrate dev 

# Start your Node.js application

