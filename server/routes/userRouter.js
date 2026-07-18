const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/all', authMiddleware, checkRoleMiddleware('ADMIN'), userController.getAllUsers)
router.delete('/:id', authMiddleware, checkRoleMiddleware('ADMIN'), userController.deleteUser)


module.exports = router