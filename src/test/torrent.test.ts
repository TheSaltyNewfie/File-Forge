import request from 'supertest'
import { app } from '../index'
import { faker } from '@faker-js/faker'

describe('Torrent API', () => {
    it('should create a new torrent', async () => {
        const randomTitle = faker.lorem.words()
        const randomMagnet = faker.internet.url()
        const randomSize = faker.number.int()
        const randomSeeders = faker.number.int()
        const randomLeechers = faker.number.int()

        const response = await request(app).post('/torrents').send({
            title: randomTitle,
            magnet: randomMagnet,
            size: randomSize,
            seeders: randomSeeders,
            leechers: randomLeechers,
        })

        expect(response.status).toBe(201)
        expect(response.body).toMatchObject({
            title: randomTitle,
            magnet: randomMagnet,
            size: randomSize,
            seeders: randomSeeders,
            leechers: randomLeechers,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        })
    })

    it('should fetch all torrents', async () => {
        const response = await request(app).get('/torrents')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})
