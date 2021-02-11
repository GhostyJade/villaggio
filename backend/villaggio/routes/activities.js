const validateToken = require('../utils/datautils')
const uuidv4 = require('uuid').v4

const createActivity = (r, handler) => {
    r.post('/activities', async request => {
        const body = await request.json()
        const { image, name, description } = body

        if (validateToken(request)) {
            var activitiesCollection = await villaggio.get('activities')
            if (!activitiesCollection) {
                const list = []
                list.push({ id: uuidv4(), name, description, image })
                await villaggio.put('activities', JSON.stringify(list))
                return handler({ success: true })
            } else {
                const list = JSON.parse(activitiesCollection)
                list.push({ id: uuidv4(), name, description, image })
                await villaggio.put('activities', JSON.stringify(list))
                return handler({ success: true })
            }
        } else return handler({ error: true })
    })
}

const listActivities = (r, handler) => {
    r.get('/activities', async request => {
        if (validateToken(request)) {
            var activities = await villaggio.get('activities')
            let list = []
            if (activities) list = JSON.parse(activities)
            return handler({ success: true, list })
        } else {
            return handler({ success: false, invalid: true })
        }
    })
}

const deleteActivity = (r, handler) => {
    r.delete('/activities', async request => {
        if (validateToken(request)) {
            const body = await request.json()
            const { id } = body
            const collection = await villaggio.get('activities')
            const list = JSON.parse(collection)
            list.splice(
                list.findIndex(e => e.id == id),
                1
            )
            await villaggio.put('activities', JSON.stringify(list))
            return handler({ success: true })
        } else return { error: true }
    })
}

const getLikeFromActivity = (r, handler) => {
    r.post('/activities/like', async request => {
        if (validateToken(request)) {
            const body = await request.json()
            const { postId } = body

            const likesCollection = await villaggio.get('likes')
            if (!likesCollection)
                return handler({ success: true, likes: [], users: [] })
            const likes = JSON.parse(likesCollection)
            const likeList = likes.filter(e => e.postId === postId)
            const usersCollection = await villaggio.get('users')
            const users = JSON.parse(usersCollection)
            const usersList = users.map(({ id, username }) => ({id, username}))
            return handler({ success: true, likes: likeList, users: usersList })
        } else handler({ error: true })
    })
}

module.exports = {
    createActivity,
    listActivities,
    deleteActivity,
    getLikeFromActivity,
}
