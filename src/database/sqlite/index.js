const sqlite3 = require('sqlite3') //esse é o drive de fato, que vai estabelecer a minha comunicaçãocom a minha base de dados
const sqlite = require('sqlite') //responsável por se conectsr
const path = require('path') //biblioteca que já vem com o node, serve para definir um path, caminho de forma flexível

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })

  return database
}

module.exports = sqliteConnection