const request = require('supertest');
const server = require('../api/server');

let token;

describe('post router', () => {
    describe('tests [GET] / ', () => {
        beforeEach(async () => {
            await request(server)
                .post("/api/auth/login")
                .send({
                    email: "testinguser123@gmail.com",
                    password: "12345"
                })
                .then(res => {
                    token = res.body.token;
                });
        });
        it('returns an error message without token', async () => {
            await request(server)
                .get('/api/posts/')
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });
        it('returns a success message with token', async () => {
            await request(server)
                .get('/api/posts/')
                .set('authorization', token)
                .then(res => {
                    expect(res.status).toBe(200);
                });
            });
        });

    describe('tests [POST] /', () => {
        it('returns an error posting with the wrong object form', async () => {
            await request(server)
                .post('/api/posts/1')
                .set('authorization', token)
                .send({
                    "posts":"Testing error add post",
                    "user_id": 1
                })
                .then(res => {
                    expect(res.status).toBe(500)
                });
        });
        it('returns a success code when correct data is sent', async () => {
            await request(server)
                .post('/api/posts/1')
                .set('authorization', token)
                .send({
                    "post":"Testing add post",
                    "user_id": 1
                })
                .then(res => {
                    expect(res.status).toBe(201)
                });
        });
    });

    describe('tests [PUT] /', () => {
        it('returns an error editing post', async () => {
            await request(server)
                .put('/api/posts/100000')
                .set('authorization', token)
                .send({
                    "posts":"Testing error put post",
                    "user_id": 1
                })
                .then(res => {
                    expect(res.status).toBe(404)
                });
        });
        it('returns a success code when data is edited', async () => {
            await request(server)
                .put('/api/posts/2')
                .set('authorization', token)
                .send({
                    "id": 2,
                    "post":"Testing put post",
                    "user_id": 1
                })
                .then(res => {
                    expect(res.status).toBe(200)
                });
        });
    });

    describe('tests [DELETE] /', () => {
        it('returns a success code when deleted', async () => {
            await request(server)
                .delete('/api/posts/1')
                .set('authorization', token)
                .then(res => {
                    expect(res.status).toBe(200)
                });
        });
    });
});