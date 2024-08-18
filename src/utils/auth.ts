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
    try {
        const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] })
        return decoded
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            console.error('JWT Error:', err.message)
            return null
        } else {
            console.error('Unexpected Error:', err)
            return null
        }
    }
}

export { hashPassword, comparePassword, genToken, verifyToken }
