import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import Users from '../infra/typeorm/entities/Users';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequestDTO {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject(UsersRepository)
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: IRequestDTO): Promise<Users> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        // criptografia do password
        const hashPassword = await hash(password, 8);

        if (checkUserExists) {
            throw new AppError('Email already used.');
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        return user;
    }
}

export default CreateUserService;
