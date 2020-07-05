// import { uuid } from 'uuidv4';
// import { startOfDay } from 'date-fns';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('timestamp with time zone')
  createdAt: Date;

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
