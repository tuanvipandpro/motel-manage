const AuthController = require('./src/controllers/AuthController')
const CustomerController = require('./src/controllers/CustomerController')

module.exports = (app) => {
    app.route('/auth/login')
        .post(AuthController.login)
    
    app.route('/api/customer')
        .get(CustomerController.getCustomersByManager)
    
    app.route('/api/deactive-customer/:id')
        .put(CustomerController.updateActiveCustomer)
}