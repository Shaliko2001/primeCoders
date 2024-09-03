// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function up(pg) {
  return pg.schema
  .createTable('admin', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('role').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('picture').notNullable();
    table.dateTime('created_at');
  })
    .createTable('home_page_arm', (table) => {
      table.increments('id').primary();
      table.jsonb('main');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('student_registr', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('surname').notNullable();
      table.integer('age').notNullable();
      table.string('email').unique().notNullable();
      table.string('course').notNullable();
      table.string('phoneNumber').notNullable();
      table.string('secontPhoneNumber');
      table.text('note');
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
    console.log('Successfully created all tables ... Arm ');
    process.kill(process.pid)

  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();

