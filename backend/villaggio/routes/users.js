const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config.json')

const registerUser = (r, handler) => {
    r.post('/register', async request => {
        const body = await request.json()

        const { username, password } = body
        const cryptedPassword = await crypt.hash(password, 8)

        if (!username || !password) {
            return handler({ error: true })
        }

        let error = false, success = false
        const usersCollection = await villaggio.get('users')
        if (usersCollection !== null) {
            const data = JSON.parse(usersCollection)
            data.forEach(e => {
                if (e.username === username)
                    error = true
            })

            if (!error) {
                data.push({ username, password: cryptedPassword, admin: false })
                await villaggio.put('users', JSON.stringify(data))
                success = true
            }
        } else {
            const data = []
            data.push({ username, password: cryptedPassword, admin: false })
            await villaggio.put('users', JSON.stringify(data))
            success = true
        }

        return handler({ error, success })
    })
}

const loginUser = async (r, handler) => {
    r.post('/login', async request => {
        const body = await request.json()
        const { username, password } = body

        let authenticated = false
        let token = null

        const value = await villaggio.get('users')
        let user = null
        if (value !== null) {
            const data = JSON.parse(value)
            data.forEach(e => {
                if (e.username === username) {
                    user = e
                    return
                }
            })
            if (user) {
                await crypt.compare(password, user.password).then((res) => {
                    if (res) {
                        authenticated = true
                        token = jwt.sign({ username }, config.SECRET, { expiresIn: '24h' })
                    }
                })
            }
        }
        if (user)
            return handler({ authenticated, token, admin: user.admin })
        else
            return handler({ authenticated, token })
    })
}
module.exports = { registerUser, loginUser }