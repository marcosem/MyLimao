/* eslint-disable camelcase */
// import { uuid } from 'uuidv4';
// import { startOfDay } from 'date-fns';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

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
  }: Omit<User, 'id' | 'createdAt'>) {
    this.id = uuid();

    this.name = name;
    this.login = login;
    this.email = email;
    this.password = password;

    this.createdAt = startOfDay(new Date());
  }
  */
}

export default User;
