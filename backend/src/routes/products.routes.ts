import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

// productsRouter.post('/create', ensureAuthenticated, async (req, res) => {
productsRouter.post('/create', async (req, res) => {
  try {
    const { name, description, owner_id, price, price_old } = req.body;

    if (req.user.id !== owner_id) {
      return res.status(401).json({ error: 'User not authorized.' });
    }

    if (price_old) {
      if (price_old <= price) {
        return res
          .status(400)
          .json({ error: 'The new price should be lower than the old one.' });
      }
    }

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      description,
      owner_id,
      price,
      price_old,
    });

    return res.json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

productsRouter.get('/list/:id', async (req, res) => {
  const { id } = req.params;

  if (req.user.id !== id) {
    return res.status(401).json({ error: 'User not authorized.' });
  }

  const productsRepository = getCustomRepository(ProductsRepository);
  const productsList = await productsRepository.find({
    where: {
      owner_id: id,
    },
    order: {
      name: 'ASC',
    },
  });

  return res.json(productsList);
});

export default productsRouter;
