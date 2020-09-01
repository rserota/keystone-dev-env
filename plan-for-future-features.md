This environment is primarily set up to facilitate rapid iteration and ease of setup during development, 
but it could be changed to support other features.

# production / staging environments 

To support a production or staging environment, a new `Dockerfile` and `docker-compose.yml` would be needed, with several changes. 
Instead of using the default users of the web server and the database, new users should be created with minimum necessary permissions. 
The password for the database should be passed in through an environment variable, instead of being typed explicitly in a file that is committed to github. 
The code should be copied into the docker container as it's built, instead of being mounted on a volume, so that it's not necessary to have node/npm installed.

# using staging data in development environments

There are a couple of good ways to get data into your development environment, depending on what format it's in. If you have an existing postgres database that you want copied, the utility `pg_dump` (included with Postgres) makes this relatively simple. If you had a JSON file, you could import it using knex.js seeds. 


# monitoring / alerting

Monitoring can be achieved using Docker health checks, a feature of docker that runs commands on containers at scheduled intervals, to ensure the health of the container. If a health check fails, a variety of automated actions can be taken depending on the severity of the error, such as attemtping to automatically redeploy, sending emails or text messages to support staff, or creating tickets in your team's project tracking system.
