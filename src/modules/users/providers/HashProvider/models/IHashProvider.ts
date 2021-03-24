export default interface IHashProvider{
 generateHash(paload:string): Promise<string>;
 compareHash(payload:string, hashed:string): Promise<boolean>;
}