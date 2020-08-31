const child_process = require("child_process");
const exec = function(command, options) {
	return child_process.execSync(command, { encoding: "utf8", ...options });
};

exec("docker-compose up --build -d", { stdio: "inherit" });
exec("npm install", { stdio: "inherit" });
const dbTables = exec(
	"docker-compose exec -T db psql -U postgres -d postgres -c '\\dt'"
); // query the db container to check if the 'Todo' table exists
if (!dbTables.includes("Todo")) {
	try {
		exec("docker-compose exec -T web npm run create-tables", {
			stdio: "inherit",
		});
	} catch (e) {
		console.log("create-tables did not run");
	}
} else {
	console.log("Tables have already been initialised");
}
console.log("Running any new migrations");
exec("docker-compose exec -T web npx knex migrate:latest", {
	stdio: "inherit",
});
