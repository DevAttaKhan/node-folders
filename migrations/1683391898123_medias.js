/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    create table medias (
        media_id serial primary key,
        media_name varchar(40),
        folder_id  INTEGER REFERENCES folders(folder_id) on delete cascade,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
     )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
      DROP TABLE medias
    `);
};
