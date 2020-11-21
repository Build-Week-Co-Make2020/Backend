exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("email", 255).notNullable();
      tbl.string("password", 255).notNullable();
    })
    .createTable("posts", (tbl) => {
      tbl.increments();
      tbl.string("post", 255).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};