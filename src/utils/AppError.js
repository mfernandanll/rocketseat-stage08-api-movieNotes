class AppError {
  // toda minha classe tem acesso a essas variaveis dentro de qualquer outra funcionalidade
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;