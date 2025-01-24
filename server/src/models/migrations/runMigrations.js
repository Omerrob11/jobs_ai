const fs = require("fs").promises;
const path = require("path");
const pool = require("../database");

async function runMigrations() {
  try {
    const usersSqlPath = path.join(__dirname, "001_create_users_table.sql");
    const usersSql = await fs.readFile(usersSqlPath, "utf8");
    // pool.query() handle connection release automatically
    // client is the actual connection object, and we need to release it back to the pool
    // but pool.query() do it all by itself
    await pool.query(usersSql);
    console.log("users migration completed sucsusfully");

    const jobsSqlPath = path.join(__dirname, "002_create_jobs_table.sql");
    const jobsSql = await fs.readFile(jobsSqlPath, "utf8");
    await pool.query(jobsSql);
    //1. gets a connection from pool connetions
    //2. run the query
    //3. returns connection to the pool
    // pool stays open for future queries
    console.log("Jobs table migration completed successfully");
  } catch (error) {
    console.error("migration failed", error);
  }
}

runMigrations();
