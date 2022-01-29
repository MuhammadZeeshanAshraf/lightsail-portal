import knex from 'knex';

import knexfile from '../knexFile';

const db = knex(knexfile);

export default db;
