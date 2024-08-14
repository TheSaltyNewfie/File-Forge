import request from 'supertest'
import { app } from '../index'
import { faker } from '@faker-js/faker'

describe('User API', () => {
    it('should create a new user', async () => {
        const randomName = faker.person.fullName()
        const randomEmail = faker.internet.email()
        const randomPassword = faker.internet.password()

        const response = await request(app).post('/users').send({
            name: randomName,
            email: randomEmail,
            password: randomPassword,
        })

        expect(response.status).toBe(201)
        expect(response.body).toMatchObject({
            name: randomName,
            email: randomEmail,
            password: expect.any(String),
            permitted: false,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        })
    })

    it('should fetch all users', async () => {
        const response = await request(app).get('/users')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})
