import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';

const routes = Router();
const usersRepository = new UsersRepository();

routes.get('/', (req, res) => res.json({ message: 'Hello Users' }));
routes.post('/create', (req, res) => {
  const { name, login, email, password } = req.body;

  const userExist = usersRepository.findUser(login);

  if (userExist) {
    return res.status(400).json({ error: 'User login already exist' });
  }

  const user = usersRepository.create(name, login, email, password);

  return res.json(user);
});

export default routes;
