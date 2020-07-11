import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddOldPriceToProducts1594501601245
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'price_old',
        type: 'decimal',
        precision: 2,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('products', 'price_old');
  }
}
