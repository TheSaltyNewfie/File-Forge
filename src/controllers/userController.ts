import { Request, Response } from 'express'
import { User } from '../models/User'
import { hashPassword, generateToken, verifyToken } from '../utils/auth'
import jwt from 'jsonwebtoken'

// GET /users is not implemented for now
// async function getUsers(req: Request, res: Response) {
//     const token = req.headers['authorization'] || req.headers['Authorization']

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' })
//     }

//     const decoded = verifyToken(token as string)

//     if (decoded === 'invalid token') {
//         return res.status(401).json({ message: 'Unauthorized' })
//     }

//     console.log(decoded)

//     const users = await User.findAll()
//     res.status(200).json(users)
// }

async function getUser(req: Request, res: Response) {}

async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        token: generateToken(`${name}-${email}`),
        permitted: false,
    })
    res.status(201).json(user)
}

export { getUsers, createUser }
