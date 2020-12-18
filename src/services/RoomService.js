const RoomRepository = require('../repositorys/RoomRepository')
const BillRepository = require('../repositorys/BillRepository')

const createBillAndDetails = async (manager, date, total, details) => {
    try {
        let bill_id = await BillRepository.createBill(manager, date, total)
    }
    catch(e) {
        throw e
    }
}

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
            let result = await RoomRepository.getConstantPrice()
            return result
        }
        catch(e) {
            throw e
        }
    },
    /**
     * 
     */
    createBill: async (data, date, manager) => {
        try {
            let constant = await RoomRepository.getConstantPrice()
            let details = data.map(e => {
                return {
                    rm_id: e.id,
                    rm_price: e.price,
                    rm_electric_old: e.electric,
                    rm_electric_new: e.newElectric,
                    rm_water_old: e.water,
                    rm_water_new: e.newWater,
                    social: e.social,
                    price_e: constant.electric_price,
                    price_w: constant.water_price,
                    total: (e.newElectric - e.electric) * constant.electric_price + (e.newWater - e.water) * constant.water_price + e.social + e.price,
                    active: true
                }
            })

            let total = details.reduce((sum, e) => sum + e.total, 0)
            createBillAndDetails(manager, date, total, details)
            return 1
        }
        catch(e) {
            throw e
        }
    }
}