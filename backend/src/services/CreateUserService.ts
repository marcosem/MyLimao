import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
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
      throw new Error('User login already exist.');
    }

    // Verify is user email already exist
    const userEmailExist = await usersRepository.findUserByEmail(email);
    if (userEmailExist) {
      throw new Error('Email address already exist.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      login,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
