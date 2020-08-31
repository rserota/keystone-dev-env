const common = require("./common");
const exec = common.exec;
const checkContainersAreRunning = common.checkContainersAreRunning;
const ci = process.argv[2] || ""; // for CI. Pass in '-T' to disable pseudo TTY.

try {
	if (checkContainersAreRunning()) {
		//let options = detached ? {} : { stdio: "inherit" };
		exec(`docker-compose exec ${ci}  web npx mocha`, {
			stdio: "inherit",
		});
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
			throw "Containers are still not running after running 'init'.";
		}
	}
} catch (e) {
	console.log(`Tests failed`);
	process.exit(1); // non-zero exit code indicades failure
}
