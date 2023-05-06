/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    create table books (
        book_id serial primary key,
        book_name varchar(40),
        folder_id  INTEGER REFERENCES folders(folder_id) on delete cascade
     )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
      DROP TABLE books
    `);
};
