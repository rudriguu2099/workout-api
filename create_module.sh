#!/bin/bash

echo "Digite o nome do módulo:"
read nome_modulo

# Capitaliza primeira letra (ex: treino -> Treino)
NomeClasse="$(tr '[:lower:]' '[:upper:]' <<< ${nome_modulo:0:1})${nome_modulo:1}"

BASE_DIR="src/modules/$nome_modulo"

echo "Criando módulo $nome_modulo..."

mkdir -p $BASE_DIR

# =========================
# SERVICE
# =========================
cat <<EOF > $BASE_DIR/$nome_modulo.service.ts
export class ${NomeClasse}Service {

  async create(data: any) {
    return { message: "${NomeClasse} criado", data }
  }

  async findAll() {
    return []
  }
}
EOF

# =========================
# CONTROLLER
# =========================
cat <<EOF > $BASE_DIR/$nome_modulo.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ${NomeClasse}Service } from './${nome_modulo}.service.js'

const service = new ${NomeClasse}Service()

export class ${NomeClasse}Controller {

  async create(request: FastifyRequest, reply: FastifyReply) {
    const result = await service.create(request.body)
    return reply.send(result)
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const result = await service.findAll()
    return reply.send(result)
  }
}
EOF

# =========================
# SCHEMA
# =========================
cat <<EOF > $BASE_DIR/$nome_modulo.schema.ts
export const create${NomeClasse}Schema = {
  body: {
    type: 'object',
    required: [],
    properties: {}
  }
}
EOF

# =========================
# ROUTES
# =========================
cat <<EOF > $BASE_DIR/$nome_modulo.routes.ts
import type { FastifyInstance } from 'fastify'
import { ${NomeClasse}Controller } from './${nome_modulo}.controller.js'
import { create${NomeClasse}Schema } from './${nome_modulo}.schema.js'

export async function ${nome_modulo}Routes(app: FastifyInstance) {
  const controller = new ${NomeClasse}Controller()

  app.get('/', controller.findAll)
  app.post(
    '/',
    { schema: create${NomeClasse}Schema },
    controller.create
  )
}
EOF

# =========================
# MODULE INDEX
# =========================
cat <<EOF > $BASE_DIR/index.ts
import type { FastifyInstance } from 'fastify'
import { ${nome_modulo}Routes } from './${nome_modulo}.routes.js'

export async function ${nome_modulo}Module(app: FastifyInstance) {
  app.register(${nome_modulo}Routes, {
    prefix: '/${nome_modulo}s'
  })
}
EOF

echo "✅ Módulo $nome_modulo criado com sucesso!"