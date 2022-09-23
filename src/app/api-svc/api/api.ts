export * from './register.service';
import { RegisterService } from './register.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [RegisterService, UserControllerService];
