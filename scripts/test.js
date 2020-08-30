const child_process = require("child_process");
//const detached = process.argv[2]  || '' // mostly for CI. Runs the web server in the background.
const exec = function(command, options) {
	return child_process.execSync(command, { encoding: "utf8", ...options });
};

const checkContainersAreRunning = function() {
	let webIsRunning = exec("docker ps --filter name=web -q").trim();
	let dbIsRunning = exec("docker ps --filter name=db -q").trim();
	return webIsRunning && dbIsRunning;
};

try {
	if (checkContainersAreRunning()) {
		exec("docker-compose exec web npx mocha", { stdio: "inherit" });
	} else {
		console.log(
			"One or more containers are not running. Let's try running 'run' first, and then try running the tests one more time."
		);
		exec("npm run down", { stdio: "inherit" });
		exec("npm run init", { stdio: "inherit" });
		exec("npm run run-detached", { stdio: "inherit" });
		if (checkContainersAreRunning()) {
			exec("docker-compose exec web npx mocha", { stdio: "inherit" });
		} else {
			throw "Containers are still not running after running init.";
		}
	}
} catch (e) {
	console.log(`Test script failed:`);
	console.log(e);
	process.exit(1); // non-zero exit code indicades failure
}
