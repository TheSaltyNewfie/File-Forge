import express from 'express'
import cors from 'cors'
import { sequelize } from './models'
import { User } from './models/User'
import { getUsers, createUser } from './controllers/userController'


const app = express()
app.use(cors())
app.use(express.json())

app.get('/users', getUsers)

app.post('/users', createUser)

sequelize.sync({ force: true }).then(() => {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000')
    })
})