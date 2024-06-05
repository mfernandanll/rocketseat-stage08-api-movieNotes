const path = require("path")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    //funcionalidade que será executará funções no momento em que estabelecemos conexão com o banco
    pool: {
      //logo após criar, quero que execute essa function em que
      //essa function serve para que o delete em cascata 
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  }
};