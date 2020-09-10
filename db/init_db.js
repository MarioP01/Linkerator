// code to build and initialize DB goes here
const {
  client,
  createLink,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
    `);

    console.log("Finished dropping tables!");

    // build tables in correct order
    await client.query(`

    CREATE TABLE link(
      id SERIAL PRIMARY KEY,
      link varchar(255) UNIQUE NOT NULL,
      clickCount INTEGER,
      createDate DATE - format MM-DD-YYYY,
      tagId varchar(255) REFERENCES tags(id)
    )

    CREATE TABLE tags (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL
    );

      
  `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

// link varchar(255) UNIQUE NOT NULL,
// clickCount INTEGER,
// createDate DATE - format MM-DD-YYYY,
// tagId varchar(255) REFERENCES tags(id)

async function populateInitialData() {
  try {
    // create useful starting data
    await createLink({
      link: "www.yahoo.com",
      clickCount: "2",
      createDate: "08-03-2020",
      tags: ["#Search", "#Info"],
    });

    await createLink({
      link: "www.learn.fullstack.com",
      clickCount: "0",
      createDate: "08-03-2020",
      tags: ["#School", "#Info"],
    });
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    populateInitialData();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

async function testDB() {
  try {
    const test = await console.log("starting");
    console.log(createLink());
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

// buildTables()
//   .then(populateInitialData)
//   .catch(console.error)
//   .finally(() => client.end());
