import {Router} from 'express';
import {authSignUp, authLogin} from '../../controllers/auth/auth.controller.js';
export const auth_routes = Router();
// Routes
auth_routes.post('/signup', authSignUp);
auth_routes.post('/login', authLogin);