import Fastify from 'fastify'
import { usersModule } from './modules/users/index.js'
import { workoutModule } from './modules/workout/index.js'



export async function buildApp() {
  const app = Fastify({
    logger: true
  })

  app.get('/health', async () => {
    return { status: 'ok' }
  })

  app.register(usersModule)
  app.register(workoutModule)

  return app
}