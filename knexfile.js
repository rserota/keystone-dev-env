// Update with your config settings.

module.exports = {
	development: {
		client: "postgresql",
		connection: "postgres://postgres:dragons@db:5432/postgres",
		migrations: {
			tableName: "knex_migrations",
			directory: "./db/migrations",
		},
	},
};
