import Router from 'express';
import authController from '../controlers/authController';

const router = Router();

router.post('/signin', (req, res) => {
    authController.signIn(req,res);
});

router.post('/signup', (req, res) => {
    authController.signUp(req,res);
});


export default router;
