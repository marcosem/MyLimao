import { Router } from 'express';
import usersRoutes from './users.routes';
import productsRoutes from './products.routes';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World' }));

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);

export default routes;
