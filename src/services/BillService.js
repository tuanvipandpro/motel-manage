const BillRepository = require('../repositorys/BillRepository')

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
    getBillByManager: async (manager, pageNo, pageNum) => {
        try {
            let result = await BillRepository.getBillByManagerAndNo(manager, (pageNo - 1) * pageNum, pageNum)
            let total = await BillRepository.countAllBill(manager)
            return {billList: result, total}
        }
        catch(e) {
            throw e
        }
    },
    getDetailsByBillId: async (manager, bill_id) => {
        try {
            if (await BillRepository.getBillByIdAndManager(bill_id, manager)) {
                return await BillRepository.getDetailsByBillId(bill_id)
            }
            else {
                return 0
            }
        }
        catch(e) {
            throw e
        }
    }
}