const con = require('../../db')
const format = require('pg-format')

module.exports = {
    /**
     * Create history for bill
     * @param {*} data 
     */
    makeHistory: async (data) => {
        const query = format(
            'INSERT INTO history(rm_id, electric, water, create_date, updater, active) '
            + 'VALUES %L ', 
            data
        )
        try {
            let result = await con.query(query)
            return result.rowCount
        }
        catch(e) {
            throw e
        }
    }
}