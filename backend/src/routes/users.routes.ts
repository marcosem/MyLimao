import { Router } from 'express';
import User from '../models/User';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Hello Users' }));
routes.post('/create', (req, res) => {
  const { name, login, email, password } = req.body;
  const user = new User(name, login, email, password);

  return res.json(user);
});

export default routes;
