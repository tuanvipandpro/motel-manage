const con = require('../../db')
const format = require('pg-format')

module.exports = {
    /**
     * Get Room By Manager
     * @param username username
     */      
    getRoomByManager: async (manager) => {
        const query = {
            text: 'SELECT id, rm_code, manager, electric, water, price, social, active, rented ' 
                + 'FROM room '
                + 'WHERE active = true AND manager = $1'
                + 'ORDER BY id ',
            values: [manager]
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
     * Get constant price
     * @param {*} manager 
     */
    getConstantPrice: async () => {
        const query = {
            text: 'SELECT * ' 
                + 'FROM price '
                + 'WHERE active = true '
                + 'ORDER BY id ',
            values: []
        }

        try {
            let result = await con.query(query)
            return result.rows[0]
        }
        catch(e) {
            throw e
        }
    },
    /**
     * Upsert room
     * @param {*} manager 
     */    
    upsertRoom: async (data) => {
        const query = format(
            'INSERT INTO room(id, rm_code, manager, electric, water, price, social, active) '
            + 'VALUES %L '
            + 'ON CONFLICT (id) DO UPDATE '
            + 'SET electric = excluded.electric, water = excluded.water ', 
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