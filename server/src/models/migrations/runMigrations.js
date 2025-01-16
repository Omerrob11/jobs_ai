const fs = require("fs").promises;
const path = require("path");
const pool = require("../database");

async function runMigrations() {
  try {
    const sqlPath = path.join(__dirname, "001_create_users_table.sql");
    const sql = await fs.readFile(sqlPath, "utf8");
    // pool.query() handle connection release automatically
    // client is the actual connection object, and we need to release it back to the pool
    // but pool.query() do it all by itself
    await pool.query(sql);
    console.log("migration completed sucsusfully");
  } catch (error) {
    console.error("migration failed", error);
  }
}

runMigrations();
