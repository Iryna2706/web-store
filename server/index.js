require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')


const PORT = process.env.PORT || 3000


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static'))) //para acessar a pasta static, onde ficam as imagens, como recurso estatico
app.use(fileUpload({}))
app.use('/api', router)

//tem ser ultimo. Tratamento dos erros
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
       app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start()