import { uuid } from 'uuidv4';
import { startOfDay } from 'date-fns';

class User {
  id: string;

  name: string;

  login: string;

  email: string;

  password: string;

  createdAt: Date;

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
}

export default User;
