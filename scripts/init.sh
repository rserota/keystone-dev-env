#!/bin/bash
npm install && \
docker-compose up --build -d && \
docker-compose exec -d web npm run create-tables && \
echo 'Running migrations...' && \
docker-compose exec    web npx knex migrate:latest

