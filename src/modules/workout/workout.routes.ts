import type { FastifyInstance } from 'fastify'
import { WorkoutController } from './workout.controller.js'
import { createWorkoutSchema } from './workout.schema.js'

const controller = new WorkoutController()

export async function workoutRoutes(app: FastifyInstance) {

  app.get('/', controller.findAll.bind(controller))
  app.post('/', controller.create.bind(controller))
}
