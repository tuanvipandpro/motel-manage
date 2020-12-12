const AuthController = require('./src/controllers/AuthController')

module.exports = (app) => {
    app.route('/auth/login')
        .post(AuthController.login)
}