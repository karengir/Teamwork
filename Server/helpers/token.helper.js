import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const MakeToken = email => jwt.sign({email:email}, process.env.SECRET); 

export default MakeToken

