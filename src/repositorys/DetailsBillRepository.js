const con = require('../../db')

module.exports = {
    /**
     * Check paid for details
     * @param {*} id 
     */
    checkPaidForDetails: async (id) => {
        const query = {
            text: 'UPDATE bill_details '
                + 'SET is_pay = true '
                + 'WHERE id = $1',
            values: [id]
        }
       
        try {
            let result = await con.query(query)
            return result.rowCount
        }
        catch(e) {
            throw e
        }
    }
}