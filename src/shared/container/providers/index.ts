import { container } from "tsyringe";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IStoarageProvider from "./StorageProvider/models/IStorageProvider";


container.registerSingleton<IStoarageProvider>(
 'StorageProvider',
  DiskStorageProvider,
)