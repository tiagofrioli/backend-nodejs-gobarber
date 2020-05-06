import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Users from '../models/Users';
import AppError from '../errors/AppError';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: RequestDTO): Promise<Users> {
        const usersRepository = getRepository(Users);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        // criptografia do password
        const hashPassword = await hash(password, 8);

        if (checkUserExists) {
            throw new AppError('Email already used.');
        }

        const user = usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;
