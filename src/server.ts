import { buildApp } from './app.js'

async function start() {
  const app = await buildApp()

  await app.listen({
    port: 3333,
    host: '0.0.0.0'
  })
}

start()