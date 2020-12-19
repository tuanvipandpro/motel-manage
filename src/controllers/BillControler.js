const BillService = require('../services/BillService')

module.exports = {
    getBillByManager: async (req, res) => {
        try {
            let result = BillService.getBillByManager(req.variable.manager, req.params.pageNo)
            res.status(200).json(result)
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    }
}