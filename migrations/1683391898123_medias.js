/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    create table medias (
        media_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        media_name varchar(40),
        media_type VARCHAR(30),
        media_url  VARCHAR(200),
        is_favorite BOOLEAN DEFAULT false,
        folder_id  UUID REFERENCES folders(folder_id) on delete cascade,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE
     )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
      DROP TABLE medias
    `);
};
