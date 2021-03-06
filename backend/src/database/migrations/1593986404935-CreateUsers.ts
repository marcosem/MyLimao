import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1593986404935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            // isNullable: false, default is false
          },
          {
            name: 'login',
            type: 'varchar',
            // isNullable: false, default is false
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            // isNullable: false, default is false
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            // isNullable: false, default is false
          },
          {
            name: 'created_at',
            type: 'timestamp', // for non postgres
            default: 'now()',
            // type: 'timestamp with time zone',
            // default: 'CURRENT_DATE',
          },
          {
            name: 'updated_at',
            type: 'timestamp', // for non postgres
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
