import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  login: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ login, password }: RequestDTO): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    // Verify if login is user email or user login
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // let usingEmail: boolean;
    let user: User | null;
    if (re.test(String(login).toLowerCase())) {
      // Verify is user email already exist
      user = await usersRepository.findUserByEmail(login);
      if (!user) {
        throw new Error('Incorrect login validation.');
      }
    } else {
      // Verify if user login already exist
      user = await usersRepository.findUserByLogin(login);
      if (!user) {
        throw new Error('Incorrect login validation.');
      }
    }

    // Validate password
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect login validation.');
    }

    // Generate token
    const token = sign({}, '17eaad15da1efc6111a852a625b3f757', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
