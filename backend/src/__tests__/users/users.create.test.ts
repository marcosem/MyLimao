import request from 'supertest';
import express from 'express';

describe('User Routes', () => {
  const app = express();

  it('Create User - Expect User Created and its ID', () => {
    const userInput = {
      name: 'Testador',
      login: 'testlogin',
      email: 'test@test.com',
      password: 'teste123456',
    };

    const result = request(app).post('/users/create').send(userInput);
  });
});
