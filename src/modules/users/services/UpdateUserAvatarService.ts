import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import Users from '../infra/typeorm/entities/Users';

interface IRequestDTO {
    user_id: string;
    avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
    constructor(
        @inject('UsersRespository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        user_id,
        avatarFilename,
    }: IRequestDTO): Promise<Users> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Only authenticated users change avatar', 401);
        }

        // deletar avatar anterior
        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            // verifica se o arquivo existe
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}
