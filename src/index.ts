import express from 'express'
import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { sequelize } from './models'
import { User } from './models/User'
import { getUsers, createUser, getUser, deleteUser } from './controllers/userController'
import { getTorrents, createTorrent } from './controllers/torrentController'
import bodyParser from 'body-parser'
import { AuthRequest } from './utils/interfaces'
import { AuthMiddleware } from './middleware/auth'
import { createAssociations } from './models/associations'

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use(AuthMiddleware)

app.get('/users', getUsers)
app.get('/users/:id', getUser)
app.post('/users/register', createUser)
app.delete('/users/delete/:id', deleteUser)

app.get('/torrents', getTorrents)
app.post('/torrents/create', createTorrent)

export { app }

if (require.main === module) {
    createAssociations()

    sequelize.sync({ force: true }).then(() => {
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000')
        })
    })
}
