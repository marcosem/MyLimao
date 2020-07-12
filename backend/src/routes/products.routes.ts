import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const routes = Router();

routes.post('/create', async (req, res) => {
  try {
    const { name, description, ownerId, price, priceOld } = req.body;

    if (priceOld) {
      if (priceOld <= price) {
        return res
          .status(400)
          .json({ error: 'The new price should be lower than the old one' });
      }
    }

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      description,
      ownerId,
      price,
      priceOld,
    });

    return res.json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

routes.get('/list/:id', async (req, res) => {
  const { id } = req.params;

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

export default routes;
