import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  name: string;
  login: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    login,
    email,
    password,
  }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    // Verify if user login already exist
    const userLoginExist = await usersRepository.findUserByLogin(login);
    if (userLoginExist) {
      throw Error('User login already exist');
    }

    // Verify is user email already exist
    const userEmailExist = await usersRepository.findUserByEmail(email);
    if (userEmailExist) {
      throw Error('User email already exist');
    }

    const user = usersRepository.create({ name, login, email, password });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
