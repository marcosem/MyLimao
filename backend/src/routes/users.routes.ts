import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Hello Users' }));
routes.post('/create', async (req, res) => {
  try {
    const { name, login, email, password } = req.body;

    // const usersRepository = getCustomRepository(UsersRepository);

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      login,
      email,
      password,
    });

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

routes.get('/list', async (req, res) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const usersList = await usersRepository.find();

  return res.json(usersList);
});

export default routes;
