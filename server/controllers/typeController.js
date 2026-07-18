const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)

    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const type = await Type.findOne({ where: { id } })
            if (!type) {
                return next(ApiError.badRequest('Type não encontrado'))
            }
            await type.destroy()
            return res.json({ message: 'Type deletado com sucesso' })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    
}

module.exports = new TypeController()