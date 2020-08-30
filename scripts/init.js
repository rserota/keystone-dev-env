const child_process = require("child_process");
const exec = function(command, options) {
	return child_process.execSync(command, { encoding: "utf8", ...options });
};
console.log(exec("ls ./db/db_data | wc -w"));

exec("npm install", { stdio: "inherit" });
console.log(exec("ls ./db/db_data | wc -w"));
exec("docker-compose up --build -d", { stdio: "inherit" });
try {
	exec("docker-compose exec -T web npm run create-tables", {
		stdio: "inherit",
	});
} catch (e) {
	console.log("create-tables did not run");
}
console.log("Running any new migrations");
exec("docker-compose exec -T web npx knex migrate:latest", {
	stdio: "inherit",
});
