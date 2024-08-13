import knex from 'knex';
import knexConfigs from '../knex.configs';
import bCrypt from "bcryptjs"
import config  from '../src/config/variables.config';
const {ADMIN_PASSWORD} = config
async function seed(pg) {

  // Inserts seed entries
  try {

    await pg('admin').insert([
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
      
    ])



    await pg('home_page_arm').insert({
      main: {
        first: {
          text1: 'John Doe',
          text2: 'John Doe1',
          text3: 'John Doe',
          text4: 'John Doe',
          background: "sdgjkfg.png",
          link: "shop Now"
        },
        second: {
          text1: 'John Doe',
          text2: 'John Doe',
          background: "sdgjkfg.png"
        },
        third: {
          text:"ejfkwef'p",
          slides1: ["text", "8729.png"],
          slides2: ["text1", "87292.png"]
        },
        forth: {
          shop1: ["text", "8729.png"],
          shop2: ["text1", "87292.png"],
          shop3: ["text1", "87292.png"],
        },
        contact: {
          text1: 'John Doe',
          text2: 'John Doe',
          background: "sdgjkfg.png",
          link: "contact us"
        },
        header: {
          text1: 'John Doe',
          text2: 'John Doe',
          text3: 'John Doe',
          text4: 'John Doe',
          logo: "qwertes.jpg"
        },
        footer: {
          icon1: "sdojv.svg",
          icon2: "sdodfjv.svg",
          text1: 'John Doe',
          text2: 'John Doe',
          text3: 'John Doe',
          text4: 'John Doe',
        }
      },
      created_at: new Date().toISOString(), 
    });
  } catch (error) {
    console.error('Error inserting data:', error.message);
  }
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    
    const pg = knex(options);
    
    await seed(pg);
    
    // Close the database connection
    await pg.destroy();
    
    console.log('Successfully inserted all data.');
  } catch (error) {
    console.error('Initialization error:', error.message);
  }
}

init();
