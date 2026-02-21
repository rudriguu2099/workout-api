import type { FastifyReply, FastifyRequest } from "fastify"
import { userService } from './users.service.js'

//o controller fala com o service recenbendo uma request e um reply, a responsabilidade dele morre por aq

type CreateUserBody = {
    name: string
}

export async function createUser(
    request: FastifyRequest<{Body: CreateUserBody}>,
    reply: FastifyReply
) {
    const user = await userService.create(request.body)

    return reply.status(201).send(user)
}