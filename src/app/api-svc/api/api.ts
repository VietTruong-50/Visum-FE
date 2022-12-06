export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './songController.service';
import { SongControllerService } from './songController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [AuthControllerService, SongControllerService, UserControllerService];
