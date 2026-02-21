import type { FastifyRequest, FastifyReply } from 'fastify'
import { WorkoutService } from './workout.service.js'

const service = new WorkoutService()

export class WorkoutController {

  async create(request: FastifyRequest, reply: FastifyReply) {
    const userId = 'mock-user-id' // por enquanto vai ser isso

    const {name} = request.body as {
      name: string
    }

    const workout = await service.create({
      name,
      userId
    })
    return reply.status(201).send(workout)
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const userId = 'mock-user-id'

    const workouts = await service.findAllByUser(userId)

    return reply.send(workouts)
  }
}
