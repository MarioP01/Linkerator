// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/Linkerator";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// link: "www.yahoo.com",
// clickCount: "2",
// createDate: "08-03-2020",
// tags: ["#Search", "#Info"],

// database methods
async function createLink({ link, clickCount, createDate, tags }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO link(link, clickCount, createDate, tags) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (link) DO NOTHING 
      RETURNING *;
    `,
      [link, clickCount, createDate, tags]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  // db methods
};
