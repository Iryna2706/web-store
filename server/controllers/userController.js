const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const{User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            console.log('Registration request:', {email, password, role})
            if (!email || !password) {
                return next(ApiError.badRequest(' Email ou password invalidos'))
            }

            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Usuario com esse email já existe'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword, role})
            const basket = await Basket.create({userId: user.id})
            const token = generateJwt(user.id, user.email, user.role)
            console.log('Utilizador criado - ID:', user.id, 'Email:', user.email, 'Token:', token)
            return res.json({token})
        } catch(err) {
            console.error('Registration error:', err.message)
            console.error('Stack:', err.stack)
            next(err)
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        console.log('Login request:', {email})
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Usuario não encontrado'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Password incorreto'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        console.log('Utilizador login - ID:', user.id, 'Email:', user.email, 'Token:', token)
        return res.json({token})
    }

    async check(req, res) {
       const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({attributes: {exclude: ['password']}})
            return res.json(users)
        } catch(err) {
            console.error('Get users error:', err.message)
            next(err)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const {id} = req.params
            console.log('Deletando utilizador:', id)
            
            const user = await User.findByPk(id)
            if (!user) {
                return next(ApiError.badRequest('Utilizador não encontrado'))
            }

            // Apagar basket do utilizador
            await Basket.destroy({where: {userId: id}})
            // Apagar utilizador
            await user.destroy()
            
            console.log('Utilizador eliminado com sucesso - ID:', id)
            return res.json({message: 'Utilizador eliminado com sucesso'})
        } catch(err) {
            console.error('Delete user error:', err.message)
            next(err)
        }
    }
}

module.exports = new UserController()