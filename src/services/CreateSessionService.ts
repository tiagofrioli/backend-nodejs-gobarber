import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '../config/auth';
import Users from '../models/Users';

interface RequestDTO {
    email: string;
    password: string;
}

class CreateSessionService {
    public async execute({
        email,
        password,
    }: RequestDTO): Promise<{ user: Users; token: string }> {
        const usersRepository = getRepository(Users);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination');
        }

        // user.password = senha criptografada
        // password = senha não criptografada
        // O metodo compare do bcrypt compara a senha criptografada do user com a senha
        // não criptografada informada
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination');
        }

        const { secret, expiresIn } = auth.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default CreateSessionService;
