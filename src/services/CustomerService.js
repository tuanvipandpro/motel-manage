const CustomerRepository = require('../repositorys/CustomerRepository')

module.exports = {
    getCustomersByManager: async (manager) => {
        try {
            let result = await CustomerRepository.getCustomersByManager(manager)
            return result
        }
        catch(e) {
            throw e
        }
    },
    changeActiveCustomer: async (customer_id, active) => {
        try {
            let customer = await CustomerRepository.getCustomerById(customer_id)
            customer.active = active
            return await CustomerRepository.updateCustomerById(customer)
        }
        catch(e) {
            throw e
        }
    }
}