import { Request, Response } from 'express'
import { User } from '../models/User'

async function getUsers(req: Request, res: Response) {
    const users = await User.findAll()
    res.status(200).json(users)
}

async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password, permitted: false })
    res.status(201).json(user)
}

export {
    getUsers,
    createUser,
}