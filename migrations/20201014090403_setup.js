exports.up = (knex) =>
	knex.schema.createTable('mood', (table) => {
		table.increments();
		table.string('user').notNullable();
		table.date('date').notNullable();
		table.integer('score').notNullable();
		table.unique(['user', 'date']);
	});

exports.down = (knex) => knex.schema.dropTable('mood');
