require('express-async-errors')

const uploadConfig = require('./configs/upload');

const migrationsRun = require('./database/sqlite/migrations') //troca o database pelo migration e muda o caminho
const AppError = require('./utils/AppError')

const express = require('express')
const cors = require("cors")
const routes = require('./routes')

migrationsRun()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) { //erro gerado pelo cliente
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({ //erro do servidor/api
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))