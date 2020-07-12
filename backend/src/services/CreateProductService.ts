import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';
import ProductRepository from '../repositories/ProductsRepository';

interface RequestDTO {
  name: string;
  description: string;
  ownerId: string;
  price: number;
  priceOld: number;
}

class CreateProductService {
  public async execute({
    name,
    description,
    ownerId,
    price,
    priceOld,
  }: RequestDTO): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    // Verify if user already have this product
    const productLoginExist = await productsRepository.findProductByName(
      name,
      ownerId,
    );
    if (productLoginExist) {
      throw Error('The user already have a product with this name');
    }

    const product = productsRepository.create({
      name,
      description,
      owner_id: ownerId,
      price,
      price_old: priceOld,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
