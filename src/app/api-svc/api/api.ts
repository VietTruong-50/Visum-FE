export * from './genreController.service';
import { GenreControllerService } from './genreController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [GenreControllerService, UserControllerService];
