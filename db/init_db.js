// code to build and initialize DB goes here
const {
  client,
  createLink,
  createTag,
  getLinks,
  getTags,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    // drop tables in correct order
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS links;
      DROP TABLE IF EXISTS tags;
    `);

    console.log("Finished dropping tables!");

    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`

    CREATE TABLE tags(
      id SERIAL PRIMARY KEY,
      tag varchar(255) UNIQUE NOT NULL
    );

    CREATE TABLE links(
      id SERIAL PRIMARY KEY,
      link varchar(255) UNIQUE NOT NULL,
      clickCount INTEGER,
      createDate DATE,
      "tagId" INTEGER REFERENCES tags(id)
    );


  `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log("running populateInitialData");
    await createTag({
      tag: "#Info",
    });
    
    await createLink({
      link: "www.yahoo.com",
      clickCount: "2",
      createDate: "08-03-2020",
      tagId: 1,
    });

    await createLink({
      link: "www.learn.fullstack.com",
      clickCount: "0",
      createDate: "08-03-2020",
      tagId: 1,
    });
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    console.log("rebuildingDB");
    await buildTables();
    await populateInitialData();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

async function testDB() {
  try {
    console.log("starting");
    const test = await getLinks();
    const otherTest = await getTags();
    console.log("Returning:", test, "Tags:", otherTest);
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

//code change
