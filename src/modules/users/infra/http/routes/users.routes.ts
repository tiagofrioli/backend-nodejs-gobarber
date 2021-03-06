import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

// Atualizar Avatar do Usuário
usersRouter.patch(
    '/avatar',
    ensureAthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
