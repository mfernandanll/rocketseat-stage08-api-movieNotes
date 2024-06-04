const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

function myMiddleware(request, response, next) {
  console.log('Você passou pelo middleware')
  console.log(request.body)

  if (!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" })  //interrompe a função, o middleware devolve a resposta e não passa para próxima fase
  }

  next();
}

const usersController = new UsersController()

usersRoutes.post('/', myMiddleware, usersController.create) //dessa forma, dizemos que essa rota tem o middleware
usersRoutes.use(myMiddleware) //dessa forma, passamos o middleware para todas as rotas

module.exports = usersRoutes