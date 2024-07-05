const assert = require('assert');
const request = require('supertest');
const app = require('../Server/server');

describe('User Authentication', () => {
  it('should register a user', (done) => {
    request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'password' })
      .expect(201, done);
  });

  it('should login a user', (done) => {
    request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200, done);
  });
});
