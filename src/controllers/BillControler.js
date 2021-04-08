const BillService = require('../services/BillService')

module.exports = {
    /**
     * Get Bill By Manager (paging)
     * @param {*} req 
     * @param {*} res 
     */
    getBillByManager: async (req, res) => {
        try {
            let result = await BillService.getBillByManager(
                req.variable.manager, req.params.pageNo, req.query.page_num)
            res.status(200).json(result)
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    },
    /**
     * Get Bill By Room (paging)
     * @param {*} req 
     * @param {*} res 
     */
    getBillByRoom: async (req, res) => {
        try {
            let result = await BillService.getBillByRoom(
                req.params.id, req.query.page_no, req.query.page_num)
            res.status(200).json(result)
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    },
    /**
     * Get Details of Bill By Id
     * @param {*} req 
     * @param {*} res 
     */    
    getDetailsByBillId: async (req, res) => {
        try {
            let result = await BillService.getDetailsByBillId(req.variable.manager, req.params.bill_id)
            if (result === 0) {
                res.status(403).json()
                return
            }
            res.status(200).json(result)
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    }
}