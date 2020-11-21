const request = require('supertest');
const server = require('./server');

describe('server.js module', () => {
    it('is the testing environment', () => {
        expect(process.env.DB_ENV).not.toBe('development')
        expect(process.env.DB_ENV).not.toBe('production')
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('[GET] /', () => {
        it('works', () => {
            return request(server).get('/')
                .expect('Content-Type', /json/)
                .expect('Content-Length', '28')
                .expect({ message: "api is running" })
        })

        it('works also using jest syntax', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({ message: "api is running" })
            expect(res.type).toMatch(/json/)
        })
    })
});

