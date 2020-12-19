const con = require('../../db')
const format = require('pg-format')

module.exports = {
    createBill: async (manager, date, total) => {
        const query = {
            text: 'INSERT INTO bill(create_date, creater, total, active) '
                + 'VALUES($1, $2, $3, $4) ' 
                + 'RETURNING id',
            values: [date, manager, total, true]
        }

        try {
            let result = await con.query(query)
            return result.rows[0].id
        }
        catch(e) {
            throw e
        }
    },
    createDetailsForBill: async (data) => {
        const query = format(
            'INSERT INTO bill_details(bill_id, rm_id, rm_price, rm_electric_old, rm_electric_new, rm_water_old, rm_water_new, price_e, price_w, social, total, active) '
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
    },
    getBillByManagerAndNo: async (manager, offset, limit) => {
        const query = {
            text: 'SELECT * FROM bill WHERE creater = $1 AND active = true '
                + 'ORDER BY id DESC OFFSET $2 LIMIT $3',
            values: [manager, offset, limit]
        }

        try {
            let result = await con.query(query)
            return result.rows
        }
        catch(e) {
            throw e
        }
    },
    countAllBill: async (manager) => {
        const query = {
            text: 'SELECT COUNT(*) FROM bill WHERE creater = $1 AND active = true ',
            values: [manager]
        }

        try {
            let result = await con.query(query)
            return result.rows[0].count
        }
        catch(e) {
            throw e
        } 
    }
}