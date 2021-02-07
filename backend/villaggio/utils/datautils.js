const jwt = require('jsonwebtoken')

const config = require('../config.json')

module.exports = async function validateToken() {
    const token = request.headers['x-access-token']
    if (!token) {
        return { errorCode: 400, success: false }
    }
    jwt.verify(token, config.SECRET, (err, _decoded) => {
        if (err)
            return { errorCode: 400, success: false }
    })
}
