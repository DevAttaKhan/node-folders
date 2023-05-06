const sequelize = require('../config/db.confg');

class Folders {
 static getFoldersTreeQuery = `WITH RECURSIVE folder_tree AS (
        SELECT folder_id, folder_name, parent_folder_id, 0 AS level
        FROM folders
        WHERE parent_folder_id IS NULL
        UNION ALL
        SELECT f.folder_id, f.folder_name, f.parent_folder_id, level + 1
        FROM folders f
        JOIN folder_tree ft ON f.parent_folder_id = ft.folder_id
      ) SELECT json_agg(top_folder) AS folder_structure
      FROM (
        SELECT json_build_object(
          'folder_id', folder_id,
          'folder_name', folder_name,
          'parent_folder_id', parent_folder_id,
          'childrens',get_folder_hierarchy(folder_id)
        ) AS top_folder
        FROM folder_tree f
        WHERE parent_folder_id IS NULL
         
      ) top_folders;`;



  static async getFolderTree() {
    console.log(Folders.getFoldersTreeQuery)
    const [results, metadata] = await sequelize.query(
      this.getFoldersTreeQuery,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return results.folder_structure;
  }

  static async createFolder(folderName, parentFolderId) {
    const sql = `
              INSERT INTO folders (folder_name, parent_folder_id) 
              values ('${folderName}', ${parentFolderId})  
                 `;
    await sequelize.query(sql);
    return await Folders.getFolderTree();
  }

  static async deleteFolderById(id) {
    const sql = ` delete from folders where folder_id  = ${id}`;
    await sequelize.query(sql);
    return await Folders.getFolderTree();
  }
}

module.exports = Folders;
