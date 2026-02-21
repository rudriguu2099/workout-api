import type { FastifyInstance } from "fastify";
import { createUser } from './users.controller.js'
import { createUserSchema } from './users.schema.js'

//as rotas chamam controllers pra poder acessar o banco de forma segura e modular

export default async function usersRoutes(app: FastifyInstance){
    app.post(
        '/', 
        {
            schema: createUserSchema
        }, 
        createUser
)
}