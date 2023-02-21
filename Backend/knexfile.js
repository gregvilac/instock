// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    database: process.env.DB_LOCAL_DBNAME,
    charset: "utf8",
    user: process.env.DB_LOCAL_USERNAME,
    password: process.env.DB_LOCAL_PWD
  }
};

