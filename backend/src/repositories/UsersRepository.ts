import User from '../models/User';

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  // Verify if user Login exist
  public findUser(login: string): User | null {
    const userFound = this.users.find(user => user.login === login);

    // if not found, return null
    return userFound || null;
  }

  // Create user
  public create(
    name: string,
    login: string,
    email: string,
    password: string,
  ): User {
    const user = new User(name, login, email, password);

    this.users.push(user);

    return user;
  }
}

export default UsersRepository;
