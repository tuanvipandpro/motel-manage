const DetailsBillService = require('../services/DetailsBillService')

module.exports = {
    /**
     * Check paid details
     * @param {*} req 
     * @param {*} res 
     */
    checkPaidDetails: async (req, res) => {
        try {
            console.log(typeof(req.params.id))
            if (isNaN(+req.params.id)) {
                res.status(400).json({status: 400, message: 'Some params is invalid'})
            } else {
                let result = await DetailsBillService.checkPaidForDetails(req.params.id)
                if (result) res.status(200).json({message: 'OK'})
                else res.status(500).json({status: 500, message: 'Internal Server Error !'})
            }
        }
        catch(e) {
            console.error(e)
            res.status(500).json({status: 500, message: 'Internal Server Error !', error: e})
        }
    }
}