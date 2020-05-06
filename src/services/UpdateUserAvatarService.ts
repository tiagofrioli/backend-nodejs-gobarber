import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Users from '../models/Users';
import uploadConfig from '../config/upload';

interface RequestDTO {
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: RequestDTO): Promise<Users> {
        const usersRepository = getRepository(Users);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users change avatar');
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

        await usersRepository.save(user);

        return user;
    }
}
