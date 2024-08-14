import { Request, Response } from 'express'
import { Torrent } from '../models/Torrent'

async function getTorrents(req: Request, res: Response) {
    const torrents = await Torrent.findAll()
    res.status(200).json(torrents)
}

async function createTorrent(req: Request, res: Response) {
    const { title, magnet, size, seeders, leechers } = req.body
    const torrent = await Torrent.create({ title, magnet, size, seeders, leechers })
    res.status(201).json(torrent)
}

export { getTorrents, createTorrent }
