const RoomRepository = require('../repositorys/RoomRepository')

module.exports = {
    /**
     * Get Room By Manager
     * @param manager manager
     */         
    getRoomsByManager: async (manager) => {
        try {
            let result = RoomRepository.getRoomByManager(manager)
            return result
        }
        catch(e) {
            throw e
        }
    },
    /**
     * 
     * @param {*} manager 
     */
    getConstantPrice: async () => {
        try {
            let result = RoomRepository.getConstantPrice()
            return result
        }
        catch(e) {
            throw e
        }
    }
}