const createUsers = `
  CREATE TABLE IF NOT EXISTS users ( /*cria a tabela apenas se não existir essa tabela de users*/
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`

module.exports = createUsers