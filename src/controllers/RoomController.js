const RoomService = require('../services/RoomService')

module.exports = {
    /**
     * Api get room by manager
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getRoomsByManager: async (req, res) => {
        try {
            let result = await RoomService.getRoomsByManager(req.variable.manager)
            res.status(200).json({status: 200, data: result})
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    },
    /**
     * Empty Room
     * 
     * @param {*} req 
     * @param {*} res 
     */
    emptyRoom: async (req, res) => {
        try {
            await RoomService.emptyRoom(req.params.id)
            res.status(200).json({status: 200, data: "Done !!!"})
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    },
    /**
     * Api get room by id
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getRoomById: async (req, res) => {
        try {
            let result = await RoomService.getRoomById(req.variable.manager, req.params.id)
            res.status(200).json({status: 200, data: result})
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    },
    /**
     * Api get room by id
     * 
     * @param {*} req 
     * @param {*} res 
     */
     getCustomerByRoomId: async (req, res) => {
        try {
            let result = await RoomService.getCustomerByRoomId(req.variable.manager, req.params.id)
            res.status(200).json({status: 200, data: result})
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    },
    /**
     * Api get electric price && water price
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getConstantPrice: async (req, res) => {
        try {
            let result = await RoomService.getConstantPrice()
            res.status(200).json({status: 200, data: result})
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    },
    /**
     * Api create bill
     * 
     * @param {*} req 
     * @param {*} res 
     */    
    createBill: async (req, res) => {
        try {
            const body = req.body
            let result = await RoomService.createBill(body.list, body.date, req.variable.manager)
            if (result === 1) {
                res.status(200).json({message: 'Create bill successfully !!!'})
            } else {
                res.status(500).json({status: 500, message: 'Internal Server Error !'})
            }
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    }
}