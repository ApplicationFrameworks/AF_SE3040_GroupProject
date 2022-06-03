const request = require('supertest')
const app = require('../server');

test('Should add topic details', async () => {
    await request(app).post('/topic')
        .send({
            group: "aaaa",
            category: "aaaa",
            topic: "aaaaa",
            leader: "aaaaa"
        })
        .expect(201)
})

