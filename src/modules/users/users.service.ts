//o service é o que fala com o banco de dados e define regra de negocio
export const userService = {
    async create(data: { name: string}) {
        return {
            id:crypto.randomUUID(),
            name: data.name
        }
    }
}