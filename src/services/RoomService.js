const RoomRepository = require('../repositorys/RoomRepository')
const BillService = require('./BillService')
const HistoryService = require('./HistoryService')

/**
 * Update Electric-Water Room (current)
 * @param {*} data 
 * @param {*} date 
 * @param {*} manager 
 */
const updateEWRoom = async (data, date, manager) => {
    try {
        await RoomRepository.upsertRoom(data.map(e => [e.id, e.rm_code, manager, e.newElectric, e.newWater, e.price, e.social, true]))
        await HistoryService.makeHistory(data, manager, date)
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
     * Get constant price
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
     * Create bill
     * @param {*} data 
     * @param {*} date 
     * @param {*} manager 
     */
    createBill: async (data, date, manager) => {
        try {
            let constant = await RoomRepository.getConstantPrice()
            let details = data.map(e => {
                return {
                    bill_id: 0,
                    rm_id: e.id,
                    rm_price: e.price,
                    rm_electric_old: e.electric,
                    rm_electric_new: e.newElectric,
                    rm_water_old: e.water,
                    rm_water_new: e.newWater,
                    price_e: constant.electric_price,
                    price_w: constant.water_price,
                    total: (e.newElectric - e.electric) * constant.electric_price + (e.newWater - e.water) * constant.water_price + e.social + e.price,
                    social: e.social,
                    active: true
                }
            })
            let total = details.reduce((sum, e) => sum + e.total, 0)
            await BillService.createBillAndDetails(manager, date, total, details)
            await updateEWRoom(data, date, manager)
            return 1
        }
        catch(e) {
            throw e
        }
    }
}