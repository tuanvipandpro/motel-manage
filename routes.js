const AuthController = require('./src/controllers/AuthController')
const CustomerController = require('./src/controllers/CustomerController')
const RoomController = require('./src/controllers/RoomController')
const BillController = require('./src/controllers/BillControler')
const DetailsBillController = require('./src/controllers/DetailsBillController')

module.exports = (app) => {
    app.route('/auth/login')
        .post(AuthController.login)
    
    app.route('/api/customer')
        .get(CustomerController.getCustomersByManager)
    
    app.route('/api/deactive-customer/:id')
        .put(CustomerController.updateActiveCustomer)
    
    app.route('/api/room')
        .get(RoomController.getRoomsByManager)

    app.route('/api/room/con-price')
        .get(RoomController.getConstantPrice)
    
    app.route('/api/room/create-bill')
        .post(RoomController.createBill)
    
    app.route('/api/bill/:pageNo')
        .get(BillController.getBillByManager)
    
    app.route('/api/bill/details/:bill_id')
        .get(BillController.getDetailsByBillId)
    
    app.route('/api/details-bill/:id')
        .put(DetailsBillController.checkPaidDetails)
}