import express from 'express'
import cors from 'cors'
import { sequelize } from './models'
import { User } from './models/User'
import { getUsers, createUser } from './controllers/userController'
import { getTorrents, createTorrent } from './controllers/torrentController'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/users', getUsers)
app.post('/users', createUser)

app.get('/torrents', getTorrents)
app.post('/torrents', createTorrent)

export { app }

if (require.main === module) {
    sequelize.sync({ force: true }).then(() => {
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000')
        })
    })
}
