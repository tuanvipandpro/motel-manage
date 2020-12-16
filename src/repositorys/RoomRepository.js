const con = require('../../db')

module.exports = {
    /**
     * Get Room By Manager
     * @param username username
     */      
    getRoomByManager: async (manager) => {
        const query = {
            text: 'SELECT id, rm_code, manager, electric, water, price, social, active ' 
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
    }
}