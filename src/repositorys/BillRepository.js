const con = require('../../db')
const format = require('pg-format')

module.exports = {
    /**
     * Create bill
     * @param {*} manager 
     * @param {*} date 
     * @param {*} total 
     */
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
    /**
     * Create details for bill
     * @param {*} data 
     */
    createDetailsForBill: async (data) => {
        const query = format(
            'INSERT INTO bill_details(bill_id, rm_id, rm_price, rm_electric_old, rm_electric_new, rm_water_old, rm_water_new, price_e, price_w, total, social, active) '
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
    /**
     * Get bill by id and creater
     * @param {*} id 
     * @param {*} manager 
     */
    getBillByIdAndManager: async (id, manager) => {
        const query = {
            text: 'SELECT * FROM bill WHERE id = $1 AND active = true AND creater = $2 ORDER BY id ',
            values: [id, manager]
        }

        try {
            let result = await con.query(query)
            return result.rows.length > 0
        }
        catch(e) {
            throw e
        }        
    },
    /**
     * Get details for bill
     * @param {*} bill_id 
     */
    getDetailsByBillId: async (bill_id) => {
        const query = {
            text: 'SELECT * FROM bill_details WHERE bill_id = $1 ORDER BY id ',
            values: [bill_id]
        }

        try {
            let result = await con.query(query)
            return result.rows
        }
        catch(e) {
            throw e
        }        
    },
    /**
     * Get bill by creater and page no
     * @param {*} manager 
     * @param {*} offset 
     * @param {*} limit 
     */
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
    /**
     * Count all bill to paging
     * @param {*} manager 
     */
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