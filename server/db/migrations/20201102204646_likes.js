const { references } = require("./20201017125807_initial").modules;

exports.up = async (knex) => {
  await knex.schema.createTable("likes", (table) => {
    table.increments();
    table.boolean("is_liked").notNullable().defaultTo(true);
    references(table, "users");
    references(table, "woofs");
    table.unique(["users_id", "woofs_id"]);
  });
  await knex.schema.table("woofs", (table) => {});
};

exports.down = async (knex) => {
  await knex.schema.dropTable("likes");
};
