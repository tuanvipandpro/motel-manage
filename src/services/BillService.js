const BillRepository = require('../repositorys/BillRepository')
const PAGE_NUM = 5

module.exports = {
    createBillAndDetails: async (manager, date, total, details) => {
        try {
            let bill_id = await BillRepository.createBill(manager, date, total)
            details = details.map(e => {
                e.bill_id = bill_id
                return Object.values(e)
            })
            let rowCount = await BillRepository.createDetailsForBill(details)
            return {bill_id, rowCount}
        }
        catch(e) {
            throw e
        }
    },
    getBillByManager(manager, pageNo) {
        try {

        }
        catch(e) {
            throw e
        }
    }
}