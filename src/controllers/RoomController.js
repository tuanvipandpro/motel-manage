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
    }
}