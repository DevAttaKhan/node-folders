const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();

app.use(cors());
app.use(express.json());

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("learning", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

const Folder = sequelize.define(
  "Folder",
  {
    folder_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    folder_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_folder_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Folder",
        key: "folder_id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "folder",
  }
);

async function getFolderStructure() {
  const rootFolders = await Folder.findAll({
    where: { parent_folder_id: null },
  });

  const getChildren = async (folder) => {
    const children = await Folder.findAll({
      where: { parent_folder_id: folder.folder_id },
    });

    if (children.length === 0) {
      return null;
    }

    const childrenData = await Promise.all(
      children.map(async (child) => {
        const subChildren = await getChildren(child);

        return {
          folder_id: child.folder_id,
          folder_name: child.folder_name,
          parent_folder_id: child.parent_folder_id,
          childrens: subChildren,
        };
      })
    );

    return childrenData;
  };

  const folderData = await Promise.all(
    rootFolders.map(async (folder) => {
      const children = await getChildren(folder);

      return {
        folder_id: folder.folder_id,
        folder_name: folder.folder_name,
        parent_folder_id: folder.parent_folder_id,
        childrens: children,
      };
    })
  );

  return folderData;
}

const getFolders = `WITH RECURSIVE folder_tree AS (
    SELECT folder_id, folder_name, parent_folder_id, 0 AS level
    FROM folder
    WHERE parent_folder_id IS NULL
    UNION ALL
    SELECT f.folder_id, f.folder_name, f.parent_folder_id, level + 1
    FROM folder f
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

app.get("/folders", async (req, res) => {
  // const folders = await getFolderStructure();
  const [results, metadata] = await sequelize.query(getFolders, {
    type: sequelize.QueryTypes.SELECT,
  });

  res.json(results.folder_structure);
});

app.post("/folders", async (req, res) => {
  try {
    const { folderName, parentFolder } = req.body;

    const sql = `
        INSERT INTO folder (folder_name, parent_folder_id) 
        values ('${folderName}', ${parentFolder})  
    `;
    await sequelize.query(sql);
    const [results] = await sequelize.query(getFolders, {
      type: sequelize.QueryTypes.SELECT,
    });
    const { folder_structure } = results;
    res.json(folder_structure);
  } catch (error) {
    res.status(400).json({ status: 400, message: "somthing went wrong" });
  }
});

app.delete("/folders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = ` delete from folder where folder_id  = ${id}`;
    await sequelize.query(sql);
    const [results] = await sequelize.query(getFolders, {
      type: sequelize.QueryTypes.SELECT,
    });
    const { folder_structure } = results;
    res.json(folder_structure);
  } catch (error) {
    res.status(400).json({ status: 400, message: "somthing went wrong" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const sql = `select * from books`;
    const [results, metadata] = await sequelize.query(sql);

    res.json(results);
  } catch (error) {
    res.json(error);
  }
});

app.post("/books", async (req, res) => {
  try {
    const { bookName, folderId } = req.body;

    const sql = `WITH inserted_book AS (
        INSERT INTO books (book_name, folder_id)
        VALUES ('${bookName}', ${folderId})
        RETURNING *
      )
      SELECT * FROM inserted_book
      UNION
      SELECT * FROM books;`;
    const [results, metadata] = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });

    res.json(results);
  } catch (err) {
    res.json(err);
  }
});

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
  app.listen(3001, () => {
    console.log("Server listening on port 3000");
  });
});
