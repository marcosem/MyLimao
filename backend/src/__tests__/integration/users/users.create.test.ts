import request from 'supertest';
import { isUuid } from 'uuidv4';
import { parseISO, isToday } from 'date-fns';
import app from '../../../app';

describe('User Routes', () => {
  interface User {
    id: string;
    name: string;
    login: string;
    email: string;
    password: string;
    createdAt: string;
  }

  const users = [
    [
      'User One',
      {
        login: 'userone',
        email: 'userone@test.com',
        name: 'User One',
        password: '123456',
      },
      {
        login: expect.stringMatching('userone'),
        email: expect.stringMatching('userone@test.com'),
        name: expect.stringMatching('User One'),
        password: expect.stringMatching('123456'),
      },
    ],
    [
      'User Two',
      {
        login: 'usertwo',
        email: 'usertwo@test.com',
        name: 'User Two',
        password: '123456',
      },
      {
        login: expect.stringMatching('usertwo'),
        email: expect.stringMatching('usertwo@test.com'),
        name: expect.stringMatching('User Two'),
        password: expect.stringMatching('123456'),
      },
    ],
  ];

  it.each(users)(
    'Create User <%s> - Expect User Created, a valid id and creation date',
    async (_, user, userTemplate) => {
      const response = await request(app).post('/users/create').send(user);

      // Expect User information to be returned
      expect(response.body).toMatchObject(userTemplate);

      // Expect to have a valid user id
      expect(isUuid(response.body.id)).toBe(true);
      // Expect to have a valid creation date
      expect(isToday(parseISO(response.body.createdAt))).toBe(true);
    },
  );

  it('Try create duplicated login - Expect error message', async () => {
    const userInput = {
      login: 'userone',
      email: 'user@test.com',
      name: 'User One',
      password: '123456',
    };

    const response = await request(app).post('/users/create').send(userInput);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  it('Try create duplicated e-mail - Expect error message', async () => {
    const userInput = {
      login: 'user-two',
      email: 'usertwo@test.com',
      name: 'User Two',
      password: '123456',
    };

    const response = await request(app).post('/users/create').send(userInput);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  it('List Users - Expect two valid users', async () => {
    const userTemplate = [
      {
        login: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
        password: expect.any(String),
      },
      {
        login: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
        password: expect.any(String),
      },
    ];

    const response = await request(app).get('/users/list');

    // Verify body contains an array of two valid objects
    expect(response.body).toMatchObject(userTemplate);

    // Verify if each object contains user id and createdAt properties
    response.body.forEach((user: User) => {
      // Expect to have a valid user id
      expect(isUuid(user.id)).toBe(true);
      // Expect to have a valid creation date
      expect(isToday(parseISO(user.createdAt))).toBe(true);
    });
  });
});
