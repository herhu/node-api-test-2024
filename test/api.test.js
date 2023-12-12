const request = require('supertest');
const app = require('../index'); // Adjust the path accordingly

describe('API Tests', () => {
  // Test for GET /api/posts
  it('GET /api/posts should return 200 OK', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  // Test for GET /api/posts/:id
  it('GET /api/posts/:id should return 200 OK for a valid post id', async () => {
    const response = await request(app).get('/api/posts/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('GET /api/posts/:id should return 400 Bad Request for an invalid post id', async () => {
    const response = await request(app).get('/api/posts/999');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test for GET /api/posts/:id/comments
  it('GET /api/posts/:id/comments should return 200 OK for a valid post id', async () => {
    const response = await request(app).get('/api/posts/1/comments');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('GET /api/posts/:id/comments should return 400 Bad Request for an invalid post id', async () => {
    const response = await request(app).get('/api/posts/999/comments');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test for GET /api/tags/:name
  it('GET /api/tags/:name should return 200 OK for a valid tag name', async () => {
    const response = await request(app).get('/api/tags/Sports');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('GET /api/tags/:name should return 400 Bad Request for an invalid tag name', async () => {
    const response = await request(app).get('/api/tags/NonexistentTag');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

afterAll(() => {
  // Close the server after all tests
  app.close();
});
