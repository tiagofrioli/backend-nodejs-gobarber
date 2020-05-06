import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const userCreate = new CreateUserService();

    const user = await userCreate.execute({
        name,
        email,
        password,
    });

    // deleta a exibição do password do user
    delete user.password;

    return response.json(user);
});

// Atualizar Avatar do Usuário
usersRouter.patch(
    '/avatar',
    ensureAthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;
        return response.json(user);
    },
);

export default usersRouter;
