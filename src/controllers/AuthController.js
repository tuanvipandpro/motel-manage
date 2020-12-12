const authService = require('../services/AuthService')

module.exports = {
    /**
     * Login 
     * @param username
     * @param password
     * @returns access_token
     * @returns user
     */     
    login: async (req, res) => {
        const body = req.body

        if (!body.username || !body.password) {
            res.status(400).json({status: 400, message: 'Bad Request !'})
        } else {
            try {
                const result = authService.checkLogin()
                res.status(data.statusCode).json(result)
            }
            catch(e) {
                console.error(e)
                res.status(500).json({status: 500, message: 'Internal Server Error !'})
            }
        }
    }
}