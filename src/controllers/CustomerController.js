const CustomerService = require('../services/CustomerService')

module.exports = {
    getCustomersByManager: async (req, res) => {
        try {
            let result = await CustomerService.getCustomersByManager(req.variable.manager)
            res.status(200).json({status: 200, data: result})
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !'})
        }
    },
    updateActiveCustomer: async (req, res) => {
        try {
            let result = await CustomerService.changeActiveCustomer(req.params.id, false)
            if (result) {
                res.status(200).json({status: 200, row_count: result})
            }   
            else {
                throw 500
            }
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !'})
        }
    }
}