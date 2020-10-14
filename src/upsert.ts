import type * as Knex from 'knex';

/**
 * Perform an "Upsert" using the "INSERT ... ON CONFLICT ... " syntax in PostgreSQL 9.5
 * @link https://gist.github.com/plurch/118721c2216f77640232
 * @link http://www.postgresql.org/docs/9.5/static/sql-insert.html
 * @author https://github.com/plurch
 *
 * @param {string} tableName - The name of the database table
 * @param {string} conflictTarget - The column in the table which has a unique index constraint
 * @param {Object} itemData - a hash of properties to be inserted/updated into the row
 * @returns {Promise} - A Promise which resolves to the inserted/updated row
 */
export default function upsert(
  tableName: string,
  conflictTargets: string[],
  itemData: { [key: string]: any },
  conn: Knex
) {
  let exclusions = Object.keys(itemData)
    .filter(c => !conflictTargets.includes(c))
    .map(c => conn.raw('?? = EXCLUDED.??', [c, c]).toString())
    .join(',\n');

  let insertString = conn(tableName)
    .insert(itemData)
    .toString();

  let conflictString = conn
    .raw(` ON CONFLICT (??) DO UPDATE SET ${exclusions} RETURNING *;`, [
      conflictTargets
    ])
    .toString();

  let query = (insertString + conflictString).replace(/\?/g, '\\?');

  return conn.raw(query).then(result => result.rows[0]);
}
