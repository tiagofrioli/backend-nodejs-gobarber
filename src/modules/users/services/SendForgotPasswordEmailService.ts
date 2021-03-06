import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";

import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";


interface IRequestDTO {
 email: string;
}


class SendForgotPasswordEmailService {
 constructor(
     @inject(UsersRepository)
     private usersRepository: IUsersRepository,

     @inject('MailProvider')
     private mailProvider: IMailProvider,

     @inject('UserTokensRepository')
     private userTokensRepository: IUserTokensRepository,
 ) {}

 public async execute({email}: IRequestDTO): Promise<void> {

    const user = await this.usersRepository.findByEmail(email);

    if(!user){
        throw new AppError('User does not exist.')
    }

    await this.userTokensRepository.generate(user.id);
     
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha')
 }
}

export default SendForgotPasswordEmailService;
