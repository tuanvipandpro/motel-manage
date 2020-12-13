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
    }
}