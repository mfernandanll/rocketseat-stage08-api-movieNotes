const express = require('express') //importação

const app = express() //inicialização

const PORT = 3333 //define em que porta o express ficará observando
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)) //listen(porta, função que será executada)

app.get('/message/:id/:user', (request, response) => {
  const { id, user } = request.params

  response.send(`
    Mensagem ID: ${id}.
    Para o usuário ${user}.  
    `)
})
