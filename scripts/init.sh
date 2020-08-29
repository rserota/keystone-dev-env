#!/bin/bash
npm install && \
docker-compose up --build -d && \
docker-compose exec -d web npm run create-tables && \
docker-compose exec -d web npx knex migrate:latest

