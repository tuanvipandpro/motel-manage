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

        return new Promise((resolve, reject) => {
            con.query(query).then(res => {
                resolve(res.rows[0])
            })
            .catch(e => reject(e))
        })
    }
}
