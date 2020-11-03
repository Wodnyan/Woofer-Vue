const { references } = require("./20201017125807_initial").modules;

exports.up = async (knex) => {
  await knex.schema.createTable("likes", (table) => {
  	table.increments();
    references(table, "users");
    references(table, "woofs");
  });
  await knex.schema.table("woofs", (table) => {
    table.integer("likes").unsigned().defaultTo(0).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("likes");
};
