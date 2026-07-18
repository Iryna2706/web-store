const jwt = require('jsonwebtoken')
module.exports = function(role) {
    return function (req, res, next) {
   if (req.method === 'OPTIONS') {
    next()
 }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer token
        if (!token) {
            return res.status(401).json({message: 'Utilizador não está autorizado'})
        }
         const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: 'Sem acesso'})
            }
         req.user = decoded
         next()
    } catch (e) {
        res.status(401).json({message: 'Utilizador não está autorizado'})
    }
}
}

