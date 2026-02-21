import type { FastifyInstance } from 'fastify'
import { workoutRoutes } from './workout.routes.js'

export async function workoutModule(app: FastifyInstance) {
  app.register(workoutRoutes, {
    prefix: '/workouts'
  })
}
