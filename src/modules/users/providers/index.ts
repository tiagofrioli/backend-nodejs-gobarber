import { container } from "tsyringe";
import { BCryptHashProvider } from "./HashProvider/implementatios/BCryptHashProvider";
import IHashProvider from "./HashProvider/models/IHashProvider";



container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);