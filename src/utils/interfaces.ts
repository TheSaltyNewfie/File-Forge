import { User } from '../models/User'
import { Request } from 'express'

export interface AuthRequest extends Request {
    user?: User
}
