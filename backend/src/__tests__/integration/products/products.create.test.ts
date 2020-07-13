/* eslint-disable camelcase */
import request from 'supertest';
import { isUuid, uuid } from 'uuidv4';
import { parseISO, isToday } from 'date-fns';
// import { getCustomRepository } from 'typeorm';
import app from '../../../app';
// import UserRepository from '../../../repositories/UsersRepository';

describe('Products Routes', () => {
  interface Product {
    id: string;
    name: string;
    description: string;
    owner_id: string;
    price: number;
    price_old: number;
    created_at: string;
    updated_at: string;
  }

  /*
  interface InputProduct {
    name: string;
    description: string;
    ownerId: string;
    price: number;
    priceOld: number;
  }
  */

  // let products;
  let ownerId: string;

  // It is necessary to add a user, so that you can add products for him
  beforeAll(async () => {
    /*
    const usersRepository = getCustomRepository(UserRepository);

    const user = usersRepository.create({
      name: 'User Owner',
      login: 'userOwner',
      email: 'userOwner@test.com',
      password: '1234567',
    });

    await usersRepository.save(user);
    */

    const userInput = {
      name: 'User Owner',
      login: 'userOwner',
      email: 'userOwner@test.com',
      password: '1234567',
    };

    const response = await request(app).post('/users/create').send(userInput);

    ownerId = response.body.id;

    /*
    products = [
      [
        'Product One',
        {
          name: 'Product One',
          description: 'Product with One',
          ownerId,
          price: 10.5,
          priceOld: null,
        },
        {
          name: expect.stringMatching('Product One'),
          description: expect.stringMatching('Product with One'),
          ownerId: expect.any(String),
          price: expect(10.5),
          priceOld: expect(null),
        },
      ],
      [
        'Product Two',
        {
          name: 'Product Two',
          description: 'Product with Two',
          ownerId,
          price: 20.99,
          priceOld: 10,
        },
        {
          name: expect.stringMatching('Product Two'),
          description: expect.stringMatching('Product with Two'),
          ownerId: expect.any(String),
          price: expect(20.99),
          priceOld: expect(10),
        },
      ],
    ];
    */
  });

  afterAll(async () => {
    /*
    const usersRepository = getCustomRepository(UserRepository);

    await usersRepository.delete(ownerId);
    */
  });

  // Add two different users and verify if they are correctly added
  it('Create Product <Product One> - Expect Product created with a valid id', async () => {
    const product = {
      name: 'Product One',
      description: 'Product with One',
      ownerId,
      price: 10.5,
      priceOld: null,
    };

    const productTemplate = {
      name: expect.stringMatching('Product One'),
      description: expect.stringMatching('Product with One'),
      ownerId: expect.any(String),
      price: expect.any(Number),
      priceOld: expect.any(Number),
    };

    const response = await request(app).post('/products/create').send(product);

    // Expect User information to be returned
    expect(response.body).toMatchObject(productTemplate);

    // Expect to have a valid user id
    expect(isUuid(response.body.id)).toBe(true);
  });

  it('Create Product <Product Two> - Expect Product created with a valid id', async () => {
    const product = {
      name: 'Product Two',
      description: 'Product with Two',
      ownerId,
      price: 10,
      priceOld: 20.99,
    };

    const productTemplate = {
      name: expect.stringMatching('Product Two'),
      description: expect.stringMatching('Product with Two'),
      ownerId: expect.any(String),
      price: expect.any(Number),
      priceOld: expect.any(Number),
    };

    const response = await request(app).post('/products/create').send(product);

    // Expect User information to be returned
    expect(response.body).toMatchObject(productTemplate);

    // Expect to have a valid user id
    expect(isUuid(response.body.id)).toBe(true);
  });

  /*
  it.each(products)(
    'Create Product <%s> - Expect Product created with a valid id',
    async (_, product, productTemplate) => {
      const response = await request(app)
        .post('/products/create')
        .send(product);

      // Expect User information to be returned
      expect(response.body).toMatchObject(productTemplate);

      // Expect to have a valid user id
      expect(isUuid(response.body.id)).toBe(true);
    },
  );
  */

  // Try add a duplicate produ
  it('Try add a duplicate product for the same user - Expect error message', async () => {
    const product = {
      name: 'Product One',
      description: 'Product with One',
      ownerId,
      price: 10.5,
      priceOld: null,
    };

    const response = await request(app).post('/products/create').send(product);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  // Try add product with new pricer higher than old price
  it('Try add product with new pricer higher than old price - Expect error message', async () => {
    const product = {
      name: 'Product Three',
      description: 'Product with Three',
      ownerId,
      price: 10.5,
      priceOld: 9.5,
    };

    const response = await request(app).post('/products/create').send(product);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  // Try add product with invalid owner id
  it('Try add product with invalid owner id - Expect error message', async () => {
    const product = {
      name: 'Product Invalid Id',
      description: 'Product with Invalid Id',
      ownerId: 'invalid',
      price: 10.5,
      priceOld: null,
    };

    const response = await request(app).post('/products/create').send(product);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  // Try add product with non existant owner id
  it('Try add product with non existant owner id - Expect error message', async () => {
    const product = {
      name: 'Product Invalid Id',
      description: 'Product with Invalid Id',
      ownerId: uuid(),
      price: 10.5,
      priceOld: null,
    };

    const response = await request(app).post('/products/create').send(product);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  // List all products, it should return two valid elements
  it('List Users - Expect two valid users', async () => {
    const productTemplate = [
      {
        name: expect.any(String),
        description: expect.any(String),
        owner_id: expect.any(String),
        price: expect.any(Number),
        price_old: expect.any(Number),
      },
      {
        name: expect.any(String),
        description: expect.any(String),
        owner_id: expect.any(String),
        price: expect.any(Number),
        price_old: expect.any(Number),
      },
    ];

    const response = await request(app).get(`/products/list/${ownerId}`);

    // Verify body contains an array of two valid objects
    expect(response.body).toMatchObject(productTemplate);

    // Verify if each object contains user id and createdAt properties
    response.body.forEach((product: Product) => {
      // Expect to have a valid user id
      expect(isUuid(product.id)).toBe(true);
      // Expect to have a valid creation date
      expect(isToday(parseISO(product.created_at))).toBe(true);
    });
  });
});
