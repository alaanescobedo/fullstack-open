const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app)

describe('GET /api/v1/blogs', () => {

    test('should respond with json', async () => {
        const result = await api.get('/api/v1/blogs')
        expect(result.type).toBe('application/json')
        expect(result.status).toBe(200)
    })

    afterAll(() => {
        mongoose.connection.close();
    })
})
