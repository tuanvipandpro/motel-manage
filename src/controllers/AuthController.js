const authService = require('../services/AuthService')

module.exports = {
    /**
     * Login 
     * @param username
     * @param password
     * @returns access_token
     * @returns user
     */     
    login: (req, res) => {
        const body = req.body

        if (!body.username || !body.password) {
            res.status(400).json({status: 400, message: 'Bad Request !'})
        } else {
            authService.checkLogin(body.username, body.password).then(result => {
                res.status(result.status_code).json(result)
            })
            .catch(e => {
                console.error(e)
                res.status(500).json({status: 500, message: 'Internal Server Error !'})
            })
        }
        // End
    }
}