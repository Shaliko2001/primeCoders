import knex from "knex";
import knexConfigs from "../knex.configs";
import bCrypt from "bcryptjs";
import config from "../src/config/variables.config";
const { ADMIN_PASSWORD } = config;
async function seed(pg) {
  // Inserts seed entries
  try {
    await pg("admin").insert([
      {
        role: "admin",
        name: "Shaliko",
        surname: "Arshakyan",
        email: "arshakyanshaliko9@gmail.com",
        password: bCrypt.hashSync(ADMIN_PASSWORD, bCrypt.genSaltSync(10), null),
        picture: `https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=
        rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80`,
        created_at: new Date().toISOString(),
      },
    ]);

    // Main -- Home Page --------------------------------------------------------------------------
    await pg("home_page_arm").insert({
      main: {
        text4: "John Doe",
        background: ["1.png", "2.png", "3.png", "4.png", "5.png"],
        link: "http://",
      },
      second: {
        les1: {
          text1: "John Doe1",
          text2: "John Doe1",
          text3: "John Doe1",
          image: "1.png",
        },
        les2: {
          text1: "John Doe2",
          text2: "John Doe2",
          text3: "John Doe2",
          image: "2.png",
        },
        les3: {
          text1: "John Doe3",
          text2: "John Doe3",
          text3: "John Doe3",
          image: "3.png",
        },
      },

      slogan: {
        image: "1.png",
        text: "John Doe",
      },
      about_us: {
        image: "1.png",
        background:
          "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg",
        text1: "John Doe1",
        text2: "John Doe2",
        text3: "John Doe3",
      },
      blog: {
        images: ["1.png", "2.png", "3.png", "4.png", "5.png"],
      },
      specialists: {
        spec1: {
          text1: "John Doe1",
          text2: "John Doe1",
          text3: "John Doe1",
          image: "1.png",
        },
        spec2: {
          text1: "John Doe2",
          text2: "John Doe2",
          text3: "John Doe2",
          image: "2.png",
        },
        spec3: {
          text1: "John Doe3",
          text2: "John Doe3",
          text3: "John Doe3",
          image: "3.png",
        },
      },
      contact: {
        text1: "John Doe3",
        background:
          "http://localhost:3030/upload/5a83b5b0-08fe-448f-9c8d-f5b157d0a2d1.jpg",
      },

      advertisement: {
        text4: "John Doe",
        link: "http://",
        background: "1.png",
      },
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error inserting data:", error.message);
  }
}
// Main -- Home Page --------------------------------------------------------------------------

async function init() {
  try {
    const options =
      process.env.NODE_ENV === "production"
        ? knexConfigs.production
        : knexConfigs.development;

    const pg = knex(options);

    await seed(pg);

    // Close the database connection
    await pg.destroy();

    console.log("Successfully inserted all data.");
    // kill terminal live process
    process.kill(process.pid);
  } catch (error) {
    console.error("Initialization error:", error.message);
  }
}

init();
