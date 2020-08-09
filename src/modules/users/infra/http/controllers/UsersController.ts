import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const userCreate = container.resolve(CreateUserService);

        const user = await userCreate.execute({
            name,
            email,
            password,
        });

        // deleta a exibição do password do user
        delete user.password;

        return response.json(user);
    }
}
