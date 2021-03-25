

export default interface IStoarageProvider {
 savefile(file:string): Promise<string>;
 deleteFile(file: string): Promise<void>;
}