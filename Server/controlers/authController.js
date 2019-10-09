import tokenGen from '../helpers/token.helper'
import users from '../db/user';
// import cript from 'bcrypt-nodejs';
import bcrypt from 'bcrypt';

class authController {

    static async signin(req, res) {
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        const found = users.find(u => u.email === user.email)
        if (found) {
            const compare = await bcrypt.compare(user.password, found.password);
            if(compare){
                res.status(200).json({
                status: 200,
                message: 'user is successfully Logged In',
                token: tokenGen(user.email,found.id)
            });
        } else {
            res.status(300).json({
                status: 300,
                message: 'wrong password',
               
            });
        }
        }else{
            res.status(405).json({
                status: 405,
                message: 'user does not exist',
              
            });
        }
    }

    static async signup(req, res) {
        const salt = await bcrypt.genSalt(10);
        const passwordEncr = await bcrypt.hash(req.body.password, salt);
        const user = {
            id:users.length+1,
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
                data: Object.defineProperty(user, "password", {
                    enumerable: false,
                    writable: true
                    }),
                token: tokenGen(user.email,user.id)
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