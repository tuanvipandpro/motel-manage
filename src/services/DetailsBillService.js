const DetailsBillRepository = require('../repositorys/DetailsBillRepository')

module.exports = {
    /**
     * Check paid for details
     * @param {*} id 
     */
    checkPaidForDetails: async (id) => {
        return await DetailsBillRepository.checkPaidForDetails(id) > 0
    }
}