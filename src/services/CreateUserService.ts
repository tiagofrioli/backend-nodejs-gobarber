import { getRepository } from 'typeorm';
import Users from '../models/Users';

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

        if (checkUserExists) {
            throw new Error('Email already used.');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;
