import tokenGen from '../helpers/token.helper'
import users from '../db/user';
import cript from 'bcrypt-nodejs';


class authController {

    static async signin(req, res) {
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        const found = users.find(u => u.email === user.email);
        
        if (found) {
            const compare = await cript.compare(user.password, found.password)
            if(compare){
            res.status(200).json({
                status: 200,
                message: 'user is successfully Logged In',
                data: user
            });
        }
        }
    }

    static signup(req, res) {
        const hash = cript.genSalt(10);
        const passwordEncr = cript.hash(req.body.password, hash);
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: passwordEncr,
            gender: req.body.gender,
            jobRole: req.body.jobRole,
            department: req.body.department,
            address: req.body.address
        };

        const found = users.find(u => u.email === user.email);
        if (!found) {
            users.push(user)
            res.status(201).json({
                status: 201,
                message: 'User successfully created',
                data: user,
                token: tokenGen(user.email)
            })
        } else{
            return res.status(409).json({
                status: 409,
                message: 'user already exists'
            })
        }
    }
}

export default authController;