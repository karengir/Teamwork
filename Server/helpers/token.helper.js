import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

const MakeToken = (email,id) => jwt.sign({email:email,id:id}, process.env.SECRET); 

export default MakeToken;

