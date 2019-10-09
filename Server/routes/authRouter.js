import Router from 'express';
import authController from '../controlers/authController';
import {signUp,signIn} from '../middleware/validation.middleware';


const router = Router();

router.post('/signin',signIn,  authController.signin);

router.post('/signup',signUp, authController.signup);

export default router;
