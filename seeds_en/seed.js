import knex from 'knex';
import knexConfigs from '../knex.configs';

async function seed(pg) {
  // Inserts seed entries
  try {
    await pg('home_page_en').insert({
      main: {
        first: {
          text1: 'John Doe',
          text2: 'John Doe',
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
