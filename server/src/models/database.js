const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "omermiloh",
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "interview_prep",
});

// collection of reusable connections to the db
// when we need to talk with the db, we use a client, so we take the client from the pool
// and then return it
// client is the actual db connection object we can use to run queries
// client is the direct line to db
// release is how we return the connection back to the pool
pool.connect((err, client, release) => {
  if (err) {
    return console.error("error acuiring client", err.stack);
  }
  console.log("sucsusfully connected to database");
  // console.log(client);
  // console.log(release);
});

module.exports = pool;
