import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10

async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}

function generateToken(payload: string | object | Buffer): string {
    return jwt.sign(payload, 'h4rdc0d3d_f0r_n0w')
}

function verifyToken(token: string): string | object | void {
    try {
        const decoded = jwt.verify(token, 'h4rdc0d3d_f0r_n0w')
        return decoded
    } catch (err) {
        return 'invalid token'
    }
}

export { hashPassword, comparePasswords, generateToken, verifyToken }
