const sequelize = require("../config/db.confg");

class User {
  static async create(firstName, lastName, username = null, email, password) {
    const sql = `
         INSERT INTO users (first_name, last_name, username, email, password)
         VALUES ('${firstName}','${lastName}','${username}','${email}','${password}')
         RETURNING first_name,last_name,username, email;
        `;

    const [results] = await sequelize.query(sql);
    return results;
  }

  static async findByEmail(email) {
    const sql = `
      SELECT * FROM users WHERE email = '${email}'
    `;

    const [result] = await sequelize.query(sql);

    return result[0];
  }

  static async findById(id) {
    const sql = `
       SELECT * FROM users WHERE id = ${id}
    `;

    const [result] = await sequelize.query(sql);
    return result[0];
  }
}

module.exports = User;
