import Fastify from 'fastify'
import {DatabaseMemory} from './dbmemo.js'

const database = new DatabaseMemory()

const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/', async function handler(request, reply) {
    return { hello: 'world' }
})

fastify.post('/videos', async function handler(request, reply) {
    const body = request.body
    console.log(body)
    database.create({
        title: 'Video 01',
        description: 'vídeo teste',
        duration: 1000
    })

    return reply.status(201).send()
    
})

fastify.get('/videos', async function handler(request, reply) {
    return { hello: 'world' }
})

fastify.put('/videos/:id', async function handler(request, reply) {
    return { hello: 'world' }
})

// Run the server!
try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}