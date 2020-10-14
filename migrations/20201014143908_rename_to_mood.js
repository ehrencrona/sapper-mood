exports.up = (knex) => knex.schema.renameTable('sentiment', 'mood');

exports.down = (knex) => knex.schema.renameTable('mood', 'sentiment');
