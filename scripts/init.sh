#!/bin/bash
npm install && \
docker-compose up --build -d && \
docker-compose exec -d web npm run create-tables && \
echo 'Running any new migrations' && \
docker-compose exec -d web npx knex migrate:latest

