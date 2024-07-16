// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function up(pg) {
  return pg.schema
    .createTable('admin_ru', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('surname').notNullable();
      table.string('role').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('picture').notNullable();
      table.dateTime('created_at');

    }).createTable('users_ru', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('surname').notNullable();
      table.string('role').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('picture').notNullable();
      table.dateTime('created_at');
    })
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log('Successfully created all tables ... ');
    process.kill(process.pid)

  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
