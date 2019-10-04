import tokenGen from '../helpers/token.helper'
import users from '../db/user';


class authController {

    static signIn(req, res) {
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        const found = users.find(u => u.email === user.email);
        if (found) {
            res.status(200).json({
                status: 200,
                message: 'user is successfully Logged In',
                data: user
            });
        }
    }

    static signUp(req, res) {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
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
                data: users,
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