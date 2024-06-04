const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsRun() { //function para rodar as migrations
  const schemas = [ //array de migrations que serão rodadas
    createUsers
  ].join('')

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun