import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;



// @injectable()
// class CreateSessionService {
//     constructor(
//         @inject('UsersRepository')
//         private usersRepository: IUsersRepository,
//     ) {}

//     public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
//         const user = await this.usersRepository.findByEmail(email);

//         if (!user) {
//             throw new AppError('Incorrect email/password combination', 401);
//         }

//         // user.password = senha criptografada
//         // password = senha não criptografada
//         // O metodo compare do bcrypt compara a senha criptografada do user com a senha
//         // não criptografada informada
//         const passwordMatched = await compare(password, user.password);

//         if (!passwordMatched) {
//             throw new AppError('Incorrect email/password combination', 401);
//         }

//         const { secret, expiresIn } = auth.jwt;

//         const token = sign({}, secret, {
//             subject: user.id,
//             expiresIn,
//         });

//         return { user, token };
//     }
// }

// export default CreateSessionService;
