const con = require('../../db')

module.exports = {
    createBill: async (manager, date, total) => {
        const query = {
            text: 'INSERT INTO bill(create_date, creater, total, active, is_pay) '
                + 'VALUES($1, $2, $3, $4, $5) ' 
                + 'RETURNING id',
            values: [date, manager, total, true, false]
        }

        try {
            let result = await con.query(query)
            return result.rows[0].id
        }
        catch(e) {
            throw e
        }
    }
}