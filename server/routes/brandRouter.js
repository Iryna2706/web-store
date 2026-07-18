const express = require('express')
const router = express.Router()
const brandController = require('../controllers/brandController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')


router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
router.delete('/:id', checkRoleMiddleware('ADMIN'), brandController.delete)
router.get('/', brandController.getAll)


module.exports = router