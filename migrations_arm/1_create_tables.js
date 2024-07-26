// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function up(pg) {
  return pg.schema
    .createTable('home_page_arm', (table) => {
      table.increments('id').primary();
      table.jsonb('main');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log('Successfully created all tables 7... ');
    process.kill(process.pid)

  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();

