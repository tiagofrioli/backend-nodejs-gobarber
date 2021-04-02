
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import ResetPasswordService from './ResetPasswordService';


let fakeUsersRepository: FakeUsersRepository;
let resetPassword: ResetPasswordService;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider = ResetPasswordService;


describe('SendForgotPasswordEmail', ()=> {

  beforeEach(()=> {
     fakeUsersRepository = new FakeUsersRepository();
     fakeUserTokensRepository = new FakeUserTokensRepository();
    
     resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository
      );

  });

 it('Should be able to reset the password' , async ()=> {
  

   const user = await fakeUsersRepository.create({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '123456'
   });
  
   const { token } = await fakeUserTokensRepository.generate(user.id);
  

   await resetPassword.execute({
    password: '123123',
    token: token
   });

   const updateUser = await fakeUsersRepository.findById(user.id);

   expect(updateUser?.password).toBe('123123')
  
 });



});