// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function down(pg) {
  return pg.schema
    .dropTableIfExists('home_page_arm')
    .dropTableIfExists('admin')
    .dropTableIfExists('student_registr')
    
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await down(pg);
    console.log('Successfully dropped all tables ...ARMENIA ');
    process.exit(process.pid)
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
