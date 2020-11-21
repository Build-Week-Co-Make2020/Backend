const request = require('supertest');
const server = require('../api/server');


// beforeAll(async () => {
//     await request(server)
//         .post('/auth/login')
//         .send({ email: "sofia@gmail.com", password: "12345" })
//         .then(res => {
//             token = res.body.token
//         });
// });

describe('post router', () => {
    describe('tests [GET] / before token implementation', () => {
        it('returns a success message', () => {
            return request(server)
                .get('/api/posts/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        // it('returns an error message without token', () => {
        //     return request(server)
        //         .get('/posts/')
        //         .then(res => {
        //             expect(res.status).toBe(401);
        //         });
        // });

        // it('returns a success message with token', () => {
        //     return request(server)
        //         .get('/posts/')
        //         .set('authorization', token)
        //         .then(res => {
        //             expect(res.status).toBe(200);
        //         });
        // });
    });

    describe('tests [POST] /', () => {
        it('returns an error posting with the wrong object form', () => {
            return request(server)
                .post('/api/posts/1')
                .send({
                    "posts":"Testing error add post",
                    "user_id": 1
                })
                .then(res => {
                    expect(res.status).toBe(500)
                });
        });
        it('returns a success code when correct data is sent', () => {
            return request(server)
                .post('/api/posts/1')
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
        it('returns an error finding post', () => {
            return request(server)
                .put('/api/posts/10')
                .send({
                    "posts":"Testing error put post",
                    "user_id": 1
                })
                .then(res => {
                    expect(res.status).toBe(404)
                });
        });
        it('returns a success code when data is edited', () => {
            return request(server)
                .put('/api/posts/2')
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
        it('returns a success code when deleted', () => {
            return request(server)
                .delete('/api/posts/1')
                .then(res => {
                    expect(res.status).toBe(200)
                });
        });
    });
});