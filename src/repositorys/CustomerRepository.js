const con = require('../../db')

module.exports = {
    /**
     * Get customer by manager
     * @param manager manager
     */     
    getCustomersByManager: async (manager) => {
        const query = {
            text: 'SELECT c.id, c.name, c.birthdate, c.gender, c.phone_number, c.address, c.email, c.cmnd, c.active, r.id AS rm_id, r.rm_code '
                + 'FROM customer AS c, customer_room as cr, room as r '
                + 'WHERE cr.active = true AND c.id = cr.customer_id AND r.id = cr.room_id '
                + '      AND r.manager = $1 ' 
                + 'ORDER BY c.id',
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
     * Get customer by id
     * @param {*} customer_id 
     */
    getCustomerById: async (customer_id) => {
        const query = {
            text: 'SELECT c.id, c.name, c.birthdate, c.gender, c.phone_number, c.address, c.email, c.cmnd, c.active '
                + 'FROM customer AS c '
                + 'WHERE  c.id = $1',
            values: [customer_id]
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
     * Update customer by id
     * @param {*} customer 
     */
    updateCustomerById: async (customer) => {
        const query = {
            text: 'UPDATE customer '
                + 'SET name = $1, birthdate = $2, gender = $3, phone_number = $4, address = $5, email = $6, cmnd = $7, active = $8 '
                + 'WHERE id = $9',
            values: [customer.name, customer.birthdate, customer.gender, customer.phone_number, customer.address, customer.email, customer.cmnd, customer.active, customer.id]
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