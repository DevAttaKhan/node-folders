const sequelize = require("../config/db.confg");

class Medias {
  static async getAll() {
    const sql = `select * from medias`;
    const [results] = await sequelize.query(sql);
    return results;
  }

  static async create(mediaName, folderId) {
    const sql = `WITH inserted_media AS (
      INSERT INTO medias (media_name, folder_id)
      VALUES ('${mediaName}', ${folderId})  RETURNING *
       )
      SELECT * FROM inserted_media
      UNION
      SELECT * FROM medias;`;

    const [results] = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });

    return results;
  }

  static async move(mediaId, folderId) {
    const sql = ` 
           update medias
           set folder_id = ${folderId}
           where media_id = ${mediaId}
           `;
    await sequelize.query(sql);

    const [results] = await sequelize.query("select * from medias");
    return results;
  }
}

module.exports = Medias;
