// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/linkerator";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// link: "www.yahoo.com",
// clickCount: "2",
// createDate: "08-03-2020",
// tags: ["#Search", "#Info"],

// database methods
async function createLink({ link, clickCount, createDate }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO links(link, clickCount, createDate) 
      VALUES($1, $2, $3) 
      ON CONFLICT (link) DO NOTHING 
      RETURNING *;
    `,
      [link, clickCount, createDate]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createTag(tag) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO tags(tag) 
      VALUES($1) 
      RETURNING *;
    `,
      [tag]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getLinks() {
  try {
    const { rows } = await client.query(`
      SELECT id, link, clickCount, createDate, "tagId"
      FROM links
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getTags() {
  try {
    const { rows } = await client.query(`
      SELECT id, tag
      FROM tags
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  createTag,
  getLinks,
  getTags,
  // db methods
};
