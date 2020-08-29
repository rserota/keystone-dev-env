#!/bin/bash
docker-compose up --build -d && docker-compose exec -d web npm run create-tables

