exports.up = (knex) =>
	knex.schema.alterTable('sentiment', (t) => {
		t.string('user').notNullable().alter();
	});

exports.down = (knex) =>
	knex.schema.alterTable('sentiment', (t) => {
		t.integer('user').notNullable().alter();
	});
