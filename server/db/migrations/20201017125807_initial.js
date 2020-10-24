const addDefaultColumns = (table) => {
  table.timestamps(false, true);
  table.datetime("deleted_at");
};

const references = (table, tableName) => {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references("id")
    .inTable(tableName)
    .onDelete("cascade")
    .notNullable();
};

exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments().notNullable();
    table.string("handle", 100).unique().notNullable();
    table.string("username", 100).notNullable();
    table.string("password", 200).notNullable();
    table.string("email").unique().notNullable();
    table.string("image_url");
    addDefaultColumns(table);
  });
  await knex.schema.createTable("woofs", (table) => {
    table.increments().notNullable();
    table.string("woof", 256).notNullable();
    references(table, "users");
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("woofs");
  await knex.schema.dropTable("users");
};
