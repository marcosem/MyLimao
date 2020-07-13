import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';
import ProductRepository from '../repositories/ProductsRepository';
import UserRepository from '../repositories/UsersRepository';

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
    const usersRepository = getCustomRepository(UserRepository);

    // Verify if user exist
    const userExist = await usersRepository.findByIds([ownerId]);
    if (userExist.length === 0) {
      throw Error('Invalid Owner Id, the product require a valid user');
    }

    // Verify if user already have this product
    const productsRepository = getCustomRepository(ProductRepository);
    const productNameExist = await productsRepository.findProductByName(
      name,
      ownerId,
    );
    if (productNameExist) {
      throw Error('The user already have a product with this name');
    }

    // create product
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
