const child_process = require("child_process");
const exec = function(command, options) {
	return child_process.execSync(command, { encoding: "utf8", ...options });
};

const checkContainersAreRunning = function() {
	let webIsRunning = exec("docker ps --filter name=web -q").trim();
	let dbIsRunning = exec("docker ps --filter name=db -q").trim();
	return webIsRunning && dbIsRunning;
};

module.exports = {
	exec,
	checkContainersAreRunning,
};
