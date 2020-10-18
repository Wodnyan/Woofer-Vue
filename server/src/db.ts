import knex from "knex";
const knexConfig = require("../knexfile.js");
import { Model } from "objection";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];
const connection = knex(config);
Model.knex(connection);
export default connection;
