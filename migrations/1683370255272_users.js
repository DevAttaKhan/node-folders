/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
      CREATE TABLE users(
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name VARCHAR(40),
        last_name  VARCHAR(40),
        username VARCHAR(40),
        email VARCHAR(100),
        password VARCHAR(200),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE users
    `);
};
