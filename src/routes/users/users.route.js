import {Router} from 'express';
import {getUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/users/users.controller.js';

export const users_routes = Router();

users_routes.get('/', getUsers);

users_routes.get('/:id', getUserById);

users_routes.post('/', createUser);

users_routes.put('/:id', updateUser);

users_routes.delete('/:id', deleteUser);