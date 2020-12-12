const bcrypt = require('bcrypt')
const accountRepository = require('../repositorys/AccountRepository')
const jwt = require('../utils/JwtUtils')

module.exports = {
    /**
     * Check Login
     * @param username
     * @param password
     */      
    checkLogin: async (username, password) => {
        try {
            let account = await accountRepository.getUserByUsername(username)

            const isPasswordValid = bcrypt.compareSync(password, account.password)

            if (!isPasswordValid) {
                return {message: 'Password is incorrect', statusCode: 403}
            } else {
                const access_token = jwtUtils.generateToken({username: account.username})

                if (!access_token) {
                    return {message: 'Generate JWT Error !!!', statusCode: 500}
                }
                else {
                    account.password = undefined
                    return {user: account, access_token, status_code: 200}
                }
            }
        }
        catch(e) {
            throw e
        }
    }
}