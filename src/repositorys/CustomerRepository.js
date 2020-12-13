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
                + 'WHERE c.active = true AND r.active = true AND c.id = cr.customer_id AND r.id = cr.room_id '
                + '      AND r.manager = $1',
            values: [manager]
        }
       
        try {
            let result = await con.query(query)
            return result.rows
        }
        catch(e) {
            throw e
        }
    }
}