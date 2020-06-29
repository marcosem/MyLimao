import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  name: string;
  login: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ name, login, email, password }: RequestDTO): User {
    // Verify if user login already exist
    const userLoginExist = this.usersRepository.findUserByLogin(login);
    if (userLoginExist) {
      throw Error('User login already exist');
    }

    // Verify is user email already exist
    const userEmailExist = this.usersRepository.findUserByEmail(email);
    if (userEmailExist) {
      throw Error('User email already exist');
    }

    const user = this.usersRepository.create({ name, login, email, password });

    return user;
  }
}

export default CreateUserService;
