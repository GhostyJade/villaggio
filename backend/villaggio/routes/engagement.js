const validateToken = require('../utils/datautils')
const uuidv4 = require('uuid').v4

const giveLike = async (r, handler) => {
    r.post('/like', async request => {
        if (validateToken(request)) {
            const body = await request.json()
            const { postId, userId } = body
            const likesCollection = await villaggio.get('likes')
            if (!likesCollection) {
                const list = []
                list.push({ postId, userId, id: uuidv4() })
                await villaggio.put('likes', JSON.stringify(list))
                return handler({ success: true })
            } else {
                const list = JSON.parse(likesCollection)
                const itemIndex = list.findIndex(
                    e => e.postId === postId && e.userId === userId
                )
                if (itemIndex != -1) {
                    list.splice(itemIndex, 1)
                    await villaggio.put('likes', JSON.stringify(list))
                    return handler({ success: true })
                } else {
                    list.push({ postId, userId, id: uuidv4() })
                    await villaggio.put('likes', JSON.stringify(list))
                    return handler({ success: true })
                }
            }
        } else return handler({ error: true })
    })
}

module.exports = { giveLike }
