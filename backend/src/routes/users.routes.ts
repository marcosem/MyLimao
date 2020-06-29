import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const routes = Router();
const usersRepository = new UsersRepository();

routes.get('/', (req, res) => res.json({ message: 'Hello Users' }));
routes.post('/create', (req, res) => {
  try {
    const { name, login, email, password } = req.body;

    const createUserService = new CreateUserService(usersRepository);

    const user = createUserService.execute({ name, login, email, password });

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

routes.get('/list', (req, res) => {
  const usersList = usersRepository.all();

  return res.json(usersList);
});

export default routes;
