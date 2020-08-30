#!/bin/bash
npm install && \
docker-compose up --build -d && \
docker-compose exec -T web npm run create-tables && \
echo 'Running any new migrations' && \
docker-compose exec -T web npx knex migrate:latest

