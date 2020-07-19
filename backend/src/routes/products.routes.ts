import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.post('/create', async (req, res) => {
  try {
    const { name, description, owner_id, price, price_old } = req.body;

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
