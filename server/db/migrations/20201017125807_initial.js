function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime("deleted_at");
}

exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments().notNullable();
    table.string("username", 100).notNullable();
    table.string("password", 200).notNullable();
    table.string("email").unique().notNullable();
    table.string("image_url");
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("users");
};
