const request = require('supertest');
const server = require('../api/server');

describe('tests the auth-router', () => {
    describe('signup endpoint', () => {
        it('returns a success code', () => {
            return request(server)
                .post('/api/auth/register')
                .send({
                    email: "sofia5@gmail.com",
                    password: "123456"
                })
                .then(res => {
                    expect(res.status).toBe(201);
                });
        });
        it('returns an error code if creds missing', () => {
            return request(server)
                .post('/api/auth/register')
                .send({
                    email: "sofia1@gmail.com",
                    password: ""
                })
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });
        it('returns a json', () => {
            return request(server)
            .post('/api/auth/register')
            .send({
                email: "sofia5@gmail.com",
                password: "123456"
            })
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
        });
    });

    describe('login endpoint', () => {
        it('returns a success code', () => {
            return request(server)
                .post('/api/auth/login')
                .send({
                    email: "testinguser123@gmail.com",
                    password: "12345"
                })
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
        it('returns an error code if creds are wrong', () => {
            return request(server)
                .post('/api/auth/login')
                .send({
                    email: "sofia@gmail.com",
                    password: "wrongpass"
                })
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });
        it('returns a json', () => {
            return request(server)
            .post('/api/auth/login')
            .send({
                email: "sofia@gmail.com",
                password: "12345"
            })
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
        });
    });
});