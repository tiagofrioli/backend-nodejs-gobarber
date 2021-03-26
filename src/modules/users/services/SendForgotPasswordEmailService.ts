import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import { inject } from "tsyringe";
import Users from "../infra/typeorm/entities/Users";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";


interface IRequestDTO {
 email: string;
}


class SendForgotPasswordEmailService {
 constructor(
     @inject(UsersRepository)
     private usersRepository: IUsersRepository,

     @inject('MailProvider')
     private mailProvider: IMailProvider,
 ) {}

 public async execute({email}: IRequestDTO): Promise<void> {
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha')
 }
}

export default SendForgotPasswordEmailService;
