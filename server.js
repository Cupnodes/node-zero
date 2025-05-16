import Fastify from 'fastify'
import { DatabaseMemory } from './dbmemo.js'

const database = new DatabaseMemory()

const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/', async function handler(request, reply) {
    return { hello: 'world' }
})

fastify.post('/videos', async function handler(request, reply) {
    const { title, description, duration } = request.body

    database.create({   
        title,
        description,
        duration
    })

    return reply.status(201).send()

})

fastify.get('/videos', async function handler(request, reply) {
    const videos = database.list()

    return reply.send(videos)
})

fastify.put('/videos/:id', async function handler(request, reply) {
    const { title, description, duration } = request.body
    const videoId = request.params.id

    database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

// Run the server!
try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}