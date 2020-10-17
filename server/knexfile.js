const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
  },
};
