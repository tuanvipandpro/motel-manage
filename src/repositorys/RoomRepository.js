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
     * Get Room By Id
     * @param username username
     * @param id id
     */      
     getRoomById: async (manager, id) => {
        const query = {
            text: 'SELECT id, rm_code, manager, electric, water, price, social, active, rented ' 
                + 'FROM room '
                + 'WHERE active = true AND manager = $1 AND id = $2 ',
            values: [manager, id]
        }

        try {
            let result = await con.query(query)
            return result.rows[0]
        }
        catch(e) {
            throw e
        }
    },
    getCustomerByRoomId: async (id, manager) => {
        const query = {
            text: 'SELECT c.id, c.name, c.birthdate, c.gender, c.phone_number, c.address, c.email, c.cmnd, c.active, r.id AS rm_id, r.rm_code ' 
                + 'FROM customer AS c, customer_room as cr, room as r '
                + 'WHERE c.active = true '
                + 'AND   r.active = true '
                + 'AND   c.id = cr.customer_id '
                + 'AND   r.id = cr.room_id '
                + 'AND   r.id = $1 '
                + 'AND   r.manager = $2',
            values: [id, manager]
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