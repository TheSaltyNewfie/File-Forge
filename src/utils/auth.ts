import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { User } from '../models/User'

const saltRounds = 10
const JWT_SECRET = process.env.JWT_SECRET || 'h4rdc0d3d_f0r_n0w'

async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}

function genToken(payload: string | object | Buffer): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

function verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET)
}

function verifyUser(req: Request, res: Response): any {
    const token = req.headers['authorization'] || req.headers['Authorization']

    const reqUser = User.findOne({ where: { token: token } })

    if (!reqUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    return reqUser
}

export { hashPassword, comparePassword, genToken, verifyUser, verifyToken }
