import { Request, Response } from 'express'
import { Torrent } from '../models/Torrent'
import { User } from '../models/User'
import { AuthRequest } from '../utils/interfaces'

async function getTorrents(req: Request, res: Response) {
    const torrents = await Torrent.findAll()
    res.status(200).json(torrents)
}

async function createTorrent(req: AuthRequest, res: Response) {
    const { title, magnet, size, seeders, leechers } = req.body

    const user = await User.findOne({ where: { email: req.user!.email } })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    const torrent = await Torrent.create({
        title,
        magnet,
        size,
        seeders,
        leechers,
        userId: user.id,
    })
    res.status(201).json(torrent)
}

export { getTorrents, createTorrent }
