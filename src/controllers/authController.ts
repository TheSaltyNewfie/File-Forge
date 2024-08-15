import { Request, Response } from 'express'
import { User } from '../models/User'
import { comparePassword, genToken } from '../utils/auth'

async function authenticate(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    if (!user.permitted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!(await comparePassword(password, user.password))) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = genToken({ name: user.name, email: user.email })
}

export { authenticate }
