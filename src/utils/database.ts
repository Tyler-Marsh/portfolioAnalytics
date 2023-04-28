import pg from "pg";
// will this get the right variables if dot.env() initializes first
var config = {
  user: process.env.PGUSER, // name of the user account
  database: process.env.PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT),
};

const pool = new pg.Pool(config);
export { pool };
