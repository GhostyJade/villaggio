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
        } else
            return handler({ error: true })
    })
}

const listActivities = (r, handler) => {
    r.get('/activities', async request => {
        if (validateToken(request)) {
            var activities = await villaggio.get('activities')
            let list = []
            if (activities)
                list = JSON.parse(activities)
            return handler({ success: true, list })
        } else {
            return handler({ success: false, invalid: true })
        }
    })
}

module.exports = { createActivity, listActivities }