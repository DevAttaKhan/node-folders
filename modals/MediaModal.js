const sequelize = require("../config/db.confg");

class Medias {
  static async getAll() {
    const sql = `select * from books`;
    const [results] = await sequelize.query(sql);
    return results;
  }

  static async create(mediaName, folderId) {
    const sql = `WITH inserted_book AS (
      INSERT INTO books (book_name, folder_id)
      VALUES ('${mediaName}', ${folderId})  RETURNING *
       )
      SELECT * FROM inserted_book
      UNION
      SELECT * FROM books;`;

    const [results] = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });

    return results;
  }

  static async move(mediaId, folderId) {
    const sql = ` 
           update books
           set folder_id = ${folderId}
           where book_id = ${mediaId}
           `;
    await sequelize.query(sql);

    const [results] = await sequelize.query("select * from books");
    return results;
  }
}

module.exports = Medias;
