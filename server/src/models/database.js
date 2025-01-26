const { Pool } = require("pg");

const pool = new Pool({
  // to connect to any db, youneed 4 keys of inormation
  user: process.env.DB_USER || "omermiloh", //user name
  password: process.env.DB_PASSWORD, // security code
  host: process.env.DB_HOST || "localhost", // server adress
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "interview_prep", //specific database
});

// pool - give us abunch of connections to the database
// so we could do a lot of operations simutanously
// and when we query, we get a connection from the ppool to the db
// make the query, and return the connection

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

/*

Production:
- database runs on a server
- the connection detauils will be configure using env variables
The pool will maintain multiple connections to handle many users simultaneously


To connect to a db:
- host: ip adress, or a domain name
- port: usualy 5432
- database: database name on the server
- user: specific database user

The key differences from development are:

The host is a real server somewhere, not your local computer
The credentials are much more secure
Everything is configured for multiple users and higher security
All these details usually come from your hosting provider

dev enviorment -> simple to develop on


Set up a production database on a cloud service (like Heroku, AWS, or DigitalOcean)
Get the connection credentials from your cloud provider
Set these credentials as environment variables on your production server

You sign up for a database hosting service
They provision a database server for you
They provide you with all those connection details we discussed (host, port, database name, username, password)
You add these details to your production environment variables (similar to your local .env file)
*/
