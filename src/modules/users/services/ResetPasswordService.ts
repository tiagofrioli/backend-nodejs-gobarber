import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";



interface IRequestDTO {
 token: string;
 password: string;
}


class ResetPasswordService {
 constructor(
     @inject(UsersRepository)
     private usersRepository: IUsersRepository,

     @inject('HashProvider')
     private hashProvider: IHashProvider,

     @inject('UserTokensRepository')
     private userTokensRepository: IUserTokensRepository,
 ) {}

 public async execute({token, password}: IRequestDTO): Promise<void> {

   const userToken = await this.userTokensRepository.findByToken(token);

   if(!userToken){
    throw new AppError("User token does not exists");
   }

   const user = await this.usersRepository.findById(userToken?.user_id);

   if(!user){
    throw new AppError("User does not exists");
   }

   user.password = await this.hashProvider.generateHash(password);

   await this.usersRepository.save(user);
 }
}

export default ResetPasswordService;
