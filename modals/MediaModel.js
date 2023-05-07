const sequelize = require("../config/db.confg");

class Medias {
  static async getAll(userId) {
    const sql = `select * from medias where user_id = ${userId}`;
    const [results] = await sequelize.query(sql);
    return results;
  }

  static async create(mediaName, folderId, userId) {
    const sql = `WITH inserted_media AS (
      INSERT INTO medias (media_name, folder_id, user_id)
      VALUES ('${mediaName}', ${folderId}, ${userId})  RETURNING *
       )
      SELECT * FROM inserted_media
      UNION
      SELECT * FROM medias where user_id = ${userId};`;

    const [results] = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });

    return results;
  }

  static async move(mediaId, folderId, uerId) {
    const sql = ` 
           update medias
           set folder_id = ${folderId}
           where media_id = ${mediaId}
           `;
    await sequelize.query(sql);

    const [results] = await sequelize.query(`select * from medias where user_id = ${uerId}`);
    return results;
  }
}

module.exports = Medias;
