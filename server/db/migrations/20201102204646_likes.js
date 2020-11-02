exports.up = async (knex) => {
  await knex.schema.table("woofs", (table) => {
    table.integer("likes").unsigned().defaultTo(0).notNullable();
  });
};

exports.down = async (knex) => {};
