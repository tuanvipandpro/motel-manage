const BillService = require('../services/BillService')

module.exports = {
    getBillByManager: async (req, res) => {
        try {
            
            res.status(200)
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    }
}