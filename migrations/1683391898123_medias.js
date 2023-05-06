/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    create table medias (
        media_id serial primary key,
        media_name varchar(40),
        folder_id  INTEGER REFERENCES folders(folder_id) on delete cascade
     )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
      DROP TABLE media
    `);
};
