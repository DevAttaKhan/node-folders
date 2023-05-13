const sequelize = require("../config/db.confg");

class Medias {
  static async getAll(userId) {
    const sql = `select * from medias where user_id = :userId`;
    const [results] = await sequelize.query(
      sql,

      { replacements: { userId } }
    );
    return results;
  }

  static async create(mediaName, folderId, files, userId) {
    const sql = ` 
      INSERT INTO medias (media_name,media_type,media_url,thumbnail,folder_id, user_id)
      VALUES (:mediaName, :mediaType, :mediaUrl, :thumbnail , :folderId, :userId)  
      `;

    for (let i = 0; i < files.length; i++) {
      await sequelize.query(sql, {
        replacements: {
          mediaName: files[i].originalname,
          mediaType: files[i].mimetype,
          mediaUrl: `http://localhost:3001/photos/${files[i].filename}`,
          thumbnail: `http://localhost:3001/photos/thumbnail/${files[i].filename}`,
          folderId: folderId === "null" ? null : folderId,
          userId: userId === "null" ? null : userId,
        },
        type: sequelize.QueryTypes.INSERT,
      });
    }
    const [results] = await sequelize.query(
      `select * from medias where user_id = :userId`,
      { replacements: { userId } }
    );
    return results;
  }

  static async move(mediaId, folderId, userId) {
    const sql = ` 
           update medias
           set folder_id = :folderId
           where media_id = :mediaId
           `;
    await sequelize.query(sql, {
      replacements: {
        folderId,
        mediaId,
      },
    });

    const [results] = await sequelize.query(
      `select * from medias where user_id = :userId`,
      {
        replacements: { userId },
      }
    );
    return results;
  }
}

module.exports = Medias;
