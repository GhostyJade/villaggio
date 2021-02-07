const Router = require('./router')

const users = require('./routes/users')

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(response) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify(response)
    return new Response(body, init)
}

async function handleRequest(request) {
    const r = new Router()
    // Users:
    users.registerUser(r, handler)
    users.loginUser(r, handler)

    const resp = await r.route(request)
    return resp
}
