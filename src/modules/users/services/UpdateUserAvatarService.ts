import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import Users from '../infra/typeorm/entities/Users';
import IStoarageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
    user_id: string;
    avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
    constructor(
        @inject('UsersRespository')
        private usersRepository: IUsersRepository,

        @inject('StorareProvider')
        private storageProvider: IStoarageProvider,
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
          await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.savefile(avatarFilename)

        user.avatar = fileName;

        await this.usersRepository.save(user);

        return user;
    }
}
