import { Router } from 'express';
import usersRoutes from './users.routes';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World' }));

routes.use('/users', usersRoutes);

export default routes;
