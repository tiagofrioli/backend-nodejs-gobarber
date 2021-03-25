import IStoarageProvider from "../models/IStorageProvider";
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

class DiskStorageProvider implements IStoarageProvider{
  
 public async savefile(file: string): Promise<string>{
   await fs.promises.rename(
     path.resolve(uploadConfig.tmpFolder, file),
     path.resolve(uploadConfig.uploadsFolder,file),
   )
   return file;
 }

 public async deleteFile(file: string): Promise<void>{
  const filePath = path.resolve(uploadConfig.uploadsFolder, file);

  try {
    await fs.promises.stat(filePath)
  } catch (error) {
    return
  }

  await fs.promises.unlink(filePath);
 }
}

export default DiskStorageProvider;