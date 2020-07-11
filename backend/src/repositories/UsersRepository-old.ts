import User from '../models/User';

// Data Transfer Object
interface createUserDTO {
  name: string;
  login: string;
  email: string;
  password: string;
}

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public all(): User[] {
    return this.users;
  }

  // Verify if user Login exist
  public findUserByLogin(login: string): User | null {
    const userFound = this.users.find(user => user.login === login);

    // if not found, return null
    return userFound || null;
  }

  // Verify if user Login exist
  public findUserByEmail(email: string): User | null {
    const userFound = this.users.find(user => user.email === email);

    // if not found, return null
    return userFound || null;
  }

  // Create user
  public create({ name, login, email, password }: createUserDTO): User {
    const user = new User({ name, login, email, password });

    this.users.push(user);

    return user;
  }
}

export default UsersRepository;
