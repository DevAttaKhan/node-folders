/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
     CREATE TABLE folders
    (
        folder_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
        folder_name VARCHAR(20),
        parent_folder_id UUID REFERENCES folders(folder_id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE
    )
    `);

  pgm.sql(`
  CREATE OR REPLACE FUNCTION get_folder_hierarchy(parent_id UUID DEFAULT NULL)
  RETURNS JSONB
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'folder_id', f.folder_id,
	  'parent_folder_id', f.parent_folder_id,  
    'folder_name', f.folder_name,
    'childrens', get_folder_hierarchy(f.folder_id )
  ) ), null) INTO result
  FROM folders f
  WHERE f.parent_folder_id = parent_id;
  RETURN result;
END;
$$ LANGUAGE plpgsql;
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE folders
    `);
  pgm.sql(`
    DROP FUNCTION get_folder_hierarchy
    `);
};
