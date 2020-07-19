import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findProductByName(
    name: string,
    owner_id: string,
  ): Promise<Product | null> {
    const productFound = await this.findOne({
      where: { name, owner_id },
    });

    // if not found, return null
    return productFound || null;
  }
}

export default ProductsRepository;
