import knex from 'knex';
import knexConfigs from '../knex.configs';

async function seed(pg) {
  // Inserts seed entries
  try {

    await pg('home_page_arm').insert({
      main: {
        first: {
          text1: 'հայ',
          text2: 'ՀԱՅ',
          text3: 'հայ',
          text4: 'ՀԱՅ',
          background: "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg",
          link: "Որևէ բան"
        },
        second: {
          text1: 'John Doe',
          text2: 'John Doe',
          background: "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg"
        },
        third: {
          text:"լորեմ իպսում",
          slides1: ["text", "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg"],
          slides2: ["text1", "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg"]
        },
        forth: {
          shop1: ["text", "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg"],
          shop2: ["text1", "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg"],
          shop3: ["text1", "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg"],
        },
        contact: {
          text1: 'John Doe',
          text2: 'John Doe',
          background: "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg",
          link: "contact us"
        },
        header: {
          text1: 'John Doe',
          text2: 'John Doe',
          text3: 'John Doe',
          text4: 'John Doe',
          logo: "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg"
        },
        footer: {
          icon1: "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg",
          icon2: "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg",
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
