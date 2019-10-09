import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

    const verifyToken = (req,res,next)=>{ 
        try {
            const token = req.headers.authorization;
            const valid = jwt.verify(token, process.env.SECRET);
            req.user = valid;
            next();
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: 'invalid token'
            });
        }

    }   


export default verifyToken;