const con = require('../../db')

module.exports = {
    /**
     * Get Account By Username
     * @param username username
     */  
    getUserByUsername: async (username) => {
        const query = {
            text: 'SELECT * FROM account WHERE username = $1 ',
            values: [username]
        }

        try {
            let result = await con.query(query)
            return result.rows[0]
        }
        catch(e) {
            throw e
        }
    }
}
