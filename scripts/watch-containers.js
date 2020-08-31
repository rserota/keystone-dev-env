/*
running this file (either through 'npm run watch-containers' or 'npm run watch')
will cause your docker containers to restart anytime changes are made to either the Dockerfile or docker-compose.yml
*/

const fs = require("fs");
const exec = require("./common").exec;

let restart = function() {
	exec("npm run down && npm run run");
};
fs.watchFile("./Dockerfile", restart);
fs.watchFile("./docker-compose.yml", restart);
