const child_process = require("child_process");
const detached = process.argv[2] || ""; // mostly for CI. Runs the web server in the background if the user passes in '-d'.
const exec = function(command, options) {
	return child_process.execSync(command, { encoding: "utf8", ...options });
};

const checkContainersAreRunning = function() {
	let webIsRunning = exec("docker ps --filter name=web -q").trim();
	let dbIsRunning = exec("docker ps --filter name=db -q").trim();
	return webIsRunning && dbIsRunning;
};

const runServer = function() {
	try {
		let options = detached ? {} : { stdio: "inherit" };
		exec(`docker-compose exec ${detached} web npm run dev`, options);
	} catch (e) {
		// This code runs when the user manually stops the server with ctrl-c
		console.log("\n\nShutting down.\n");
		process.exit(0);
	}
};

try {
	if (checkContainersAreRunning()) {
		runServer();
	} else {
		console.log(
			"One or more containers are not running. Let's try running 'init' first, and then try starting the server one more time."
		);
		exec("npm run down", { stdio: "inherit" });
		exec("npm run init", { stdio: "inherit" });
		if (checkContainersAreRunning()) {
			runServer();
		} else {
			throw "Containers are still not running after running init.";
		}
	}
} catch (e) {
	console.log(`Run script failed:`);
	console.log(e);
	process.exit(1); // non-zero exit code indicades failure
}
