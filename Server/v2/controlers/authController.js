import tokenGen from '../helpers/token.helper'
// import users from '../db/user';
import bcrypt from 'bcrypt';
import queries from '../db/queries';
import executeQuery from '../db/executeQuery';

class authController {

    static async signin(req, res) {
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        const found = await executeQuery.real(queries.users.findByEmail, [user.email])
        if (found.rowCount > 0) {
            const compare = await bcrypt.compare(user.password, found.rows[0].password);
            if (compare) {
                res.status(200).json({
                    status: 200,
                    message: 'user is successfully Logged In',
                    token: tokenGen(user.email, found.id)
                });
            } else {
                res.status(300).json({
                    status: 300,
                    message: 'wrong password',

                });
            }
        } else {
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
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: passwordEncr,
            gender: req.body.gender,
            jobRole: req.body.jobRole,
            department: req.body.department,
            address: req.body.address
        };

        const found = await executeQuery.real(queries.users.findByEmail, [user.email]);
        if (found.rowCount === 0) {
            let params = [user.firstname, user.lastname, user.email, user.password, user.gender, user.jobRole, user.department, user.address];
            await executeQuery.real(queries.users.insert, params);
            res.status(201).json({
                status: 201,
                message: 'User successfully created',
                data: Object.defineProperty(user, "password", {
                    enumerable: false,
                    writable: true
                }),
                token: tokenGen(user.email)
            })
        } else {
            return res.status(409).json({
                status: 409,
                message: 'user already exists'
            })
        }
    }
}

export default authController;