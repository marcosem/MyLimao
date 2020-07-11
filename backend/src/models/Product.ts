/* eslint-disable camelcase */
// import { uuid } from 'uuidv4';
// import { startOfDay } from 'date-fns';
import {
  Entity,
  Column,
  // ForeignKey,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('users')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  // @ForeignKey((u: User) => u.id)
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  price: number;

  // @Column('timestamp with time zone')
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /*
  constructor({
    name,
    login,
    email,
    password,
  }: Omit<Product, 'id' | 'createdAt'>) {
    this.id = uuid();

    this.name = name;
    this.login = login;
    this.email = email;
    this.password = password;

    this.createdAt = startOfDay(new Date());
  }
  */
}

export default Product;
