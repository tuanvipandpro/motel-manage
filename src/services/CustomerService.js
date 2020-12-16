const CustomerRepository = require('../repositorys/CustomerRepository')

module.exports = {
    /**
     * Get Customer By Manager
     * @param manager manager
     */         
    getCustomersByManager: async (manager) => {
        try {
            let result = await CustomerRepository.getCustomersByManager(manager)
            return result
        }
        catch(e) {
            throw e
        }
    },
    /**
     * Update Active Customer By Id
     * @param id id
     */        
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