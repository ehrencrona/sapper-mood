exports.up = (knex) =>
	knex.schema.createTable('sentiment', (table) => {
		table.increments();
		table.integer('user').notNullable();
		table.date('date').notNullable();
		table.integer('score').notNullable();
		table.unique(['user', 'date']);
	});

exports.down = (knex) => knex.schema.dropTable('sentiment');
