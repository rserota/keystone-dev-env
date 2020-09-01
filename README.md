# Docker-based KeystoneJS dev environment

The goal of this project is to get you up and running in a KeystoneJS dev environment as quickly and simply as possible. 
Many common actions that you might want to take as a developer can be done using npm scripts in the package.json. 
The most relevant of these scripts are described below. 

1. [npm run init](#npm-run-init)
1. [npm run run](#npm-run-run)
1. [npm run test](#npm-run-test)
1. [npm run down](#npm-run-down)
1. [npm run prettier-check](#npm-run-prettier-check)
1. [npm run prettier-fix](#npm-run-prettier-fix)
1. [npm run watch](#npm-run-watch)





# npm-run-init
This script will start your docker containers, install new dependencies, and run database migrations.
This script does not start the web server. 

# npm-run-run
This script actually starts the KeystoneJS web server. If either the web or db containers are not running, it attempts to run `npm run init`,
and then tries to start the web server again. Press `ctrl-c` to stop the server. 

# npm-run-test
Runs the mocha test suite. If either container is not running, it attempts so run `npm run init`, and then tries to run the tests again. 

# npm-run-down
Shuts down and removes all containers in this docker-compose network. 
Use this when you're not working on this project, and need to work on another project using docker. 

# npm-run-prettier-check
Runs the prettier formatter. This will tell you if any html, css, or js files are violating the style rules defined in `.prettierrc.js`, but won't actually edit any files.

# npm-run-prettier-fix
Will edit and fix any html, css, or js files that violate style rules defined in `.prettierrc.js`. 

# npm-run-watch
Starts a process that watches the `Dockerfile` and `docker-compose.yml` for changes. If either file changes, runs `npm run down` followed by `npm run init`. 

The other scripts in the package.json are used for continuous integration, or are used internally by other scripts. You probably won't need to use them regularly as a developer. 
