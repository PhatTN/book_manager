exports.up = async function(knex) {
  await knex.schema.raw(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS books(
      book_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR (200) NOT NULL,
      description VARCHAR (5000) NOT NULL,
      isbn CHAR(10) NOT NULL,
      author_name VARCHAR(100),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

exports.down = async function(knex) {
  await knex.schema.raw(`
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS knex_migrations;
    DROP TABLE IF EXISTS knex_migrations_lock;
  `);
};
