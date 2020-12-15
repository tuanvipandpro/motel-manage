const jwt = require('jsonwebtoken')

// JWT Credentials
const ACCESS_TOKEN_LIFE = '24h'
const ACCESS_TOKEN_SECRET = 'JLUgkGLgGI56df626ghT4+9lbjLggLjf5+49zXCV9a'

// Constant
const NO_AUTH_URL = ['/auth/login', '/']

module.exports = {
    /**
     * Generate Token 
     * @param data
     */    
    generateToken: (data) => {
        try {
            return jwt.sign(data, ACCESS_TOKEN_SECRET, {algorithm: 'HS256', expiresIn: ACCESS_TOKEN_LIFE})
        }
        catch(e) {
            console.error('Error when generater token : ' + e)
            throw e
        }
    },
    /**
     * Verify Token
     * @param req
     * @param res
     * @param next
     */  
    verifyToken: (req, res, next) => {
        // console.log(req)
        if (NO_AUTH_URL.includes(req.originalUrl)) return next()
        else {           
            try {
                console.log(req.headers)
                let token = req.headers.authorization.substring(7)
                // add handle
                const verifyObj = jwt.verify(token, ACCESS_TOKEN_SECRET, {algorithm: 'HS256', expiresIn: ACCESS_TOKEN_LIFE})
                
                req.variable = {manager: verifyObj.username}
                return next()
            }
            catch(e) {
                console.error(e)
                res.status(403).json({message: 'Forbidden !!!'})
            }
        }      
    }    
}