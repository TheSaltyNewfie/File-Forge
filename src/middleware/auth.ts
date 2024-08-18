import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/auth'
import { User } from '../models/User'
import { AuthRequest } from '../utils/interfaces'

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const noAuthRoutes = ['/auth/login', '/users/register']
    if (noAuthRoutes.includes(req.path)) return next()

    const authReq = req as AuthRequest
    const token = authReq.headers['Authorization'] || authReq.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded = verifyToken(token.toString())

    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findOne({ where: { email: decoded.email } })

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    authReq.user = decoded

    next()
}
