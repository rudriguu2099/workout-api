import type { FastifyInstance } from 'fastify'
import usersRoutes from './users.routes.js'

export async function usersModule(app: FastifyInstance) {
  app.register(usersRoutes, {
    prefix: '/users',
  })
}