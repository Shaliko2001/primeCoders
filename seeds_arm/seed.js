import bCrypt from 'bcryptjs';
// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';
import config from '../src/config/variables.config';

const {ADMIN_PASSWORD} = config;

async function seed(pg) {
  // // Deletes ALL existing entries
  // await pg('messages').truncate();
  // // Deletes ALL existing entries with cascade.
  // await pg.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  // await pg.raw('TRUNCATE TABLE chat_members RESTART IDENTITY CASCADE');
  // await pg.raw('TRUNCATE TABLE chats RESTART IDENTITY CASCADE');

  // // Inserts seed entries

  await pg('admin_arm').insert([
    {
      role : "admin",
      name: 'Sergo',
      surname : "Abrahamyan",
      email: 'admin@gmail.com',
      password: bCrypt.hashSync(ADMIN_PASSWORD, bCrypt.genSaltSync(10), null),
      picture:
      `https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=
      rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80`,
      created_at: new Date().toISOString(),
    },
    
  ]);
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await seed(pg);
    console.log('Successfully inserted all data ... ');
  } catch (error) {
    console.error(error.message);
  }
}

init();
