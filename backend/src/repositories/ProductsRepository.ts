import { EntityRepository, Repository } from 'typeorm';
// import User from '../models/User';
import Product from '../models/Product';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findProductByName(
    name: string,
    ownerId: string,
  ): Promise<Product | null> {
    const productFound = await this.findOne({
      where: { name, owner_id: ownerId },
    });

    // if not found, return null
    return productFound || null;
  }
}

export default ProductsRepository;
