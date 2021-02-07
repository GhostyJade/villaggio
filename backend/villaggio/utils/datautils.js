const jwt = require('jsonwebtoken')

const config = require('../config.json')

module.exports = function validateToken(request) {
    const token = request.headers.get('x-access-token')
    if (!token) {
        return false
    } else
        try {
            const result = jwt.verify(token, config.SECRET)
            if (result) return true
            return false
        } catch (err) {
            return false
        }

}
