import { Request, Response } from 'express'
import { User } from '../models/User'
import { hashPassword, genToken } from '../utils/auth'
import { AuthRequest } from '../utils/interfaces'

async function getUsers(req: Request, res: Response) {
    const users = await User.findAll({ attributes: { exclude: ['password', 'token'] } })
    res.status(200).json(users)
}

async function getUser(req: Request, res: Response) {
    let { id } = req.params

    const user = await User.findOne({
        where: { id: id },
        attributes: { exclude: ['password', 'token'] },
    })
    res.status(200).json(user)
}

async function getSelf(req: AuthRequest, res: Response) {
    const user = await User.findOne({
        where: { email: req.user!.email },
        attributes: { exclude: ['password', 'token'] },
    })
    res.status(200).json(user)
}

async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        token: genToken({ name: name, email: email }),
        permitted: true,
    })
    res.status(201).json(user)
}

async function deleteUser(req: AuthRequest, res: Response) {
    const user = await User.findOne({ where: { email: req.user!.email } })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    await user.destroy()

    res.status(204).send()
}

export { getUsers, createUser, getUser, deleteUser }
