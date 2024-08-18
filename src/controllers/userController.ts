import { Request, Response } from 'express'
import { User } from '../models/User'
import { hashPassword, genToken } from '../utils/auth'
import { AuthRequest } from '../utils/interfaces'
import { Config, Roles } from '../config/config'

async function getUsers(req: Request, res: Response) {
    const users = await User.findAll({ attributes: { exclude: ['password'] } })
    res.status(200).json(users)
}

async function getUser(req: Request, res: Response) {
    let { id } = req.params

    const user = await User.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] },
    })
    res.status(200).json(user)
}

async function getSelf(req: AuthRequest, res: Response) {
    const user = await User.findOne({
        where: { email: req.user!.email },
        attributes: { exclude: ['password'] },
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
        permitted: true,
        role: Config.DefaultRole,
    })
    res.status(201).json(user)
}

async function updateUser(req: AuthRequest, res: Response) {
    const { id, name, email, password, role, permitted } = req.body

    const user = await User.findOne({ where: { email: req.user!.email } })

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const isAdminOrOwner = user.role === Roles.Admin || user.role === Roles.Owner

    if (user.id === id || isAdminOrOwner) {
        try {
            await User.update({ name, email, password, role, permitted }, { where: { id } })
            return res.status(200).json({ message: 'User updated' })
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user' })
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

async function deleteUser(req: AuthRequest, res: Response) {
    const { id } = req.params
    const user = await User.findOne({ where: { email: req.user!.email } })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    const isAdminOrOwner = user.role === Roles.Admin || user.role === Roles.Owner

    if (user.id === parseInt(id) || isAdminOrOwner) {
        await User.destroy({ where: { id } })
    } else {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    res.status(204).send()
}

export { getUsers, getUser, getSelf, createUser, updateUser, deleteUser }
