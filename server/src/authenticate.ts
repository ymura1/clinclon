import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = (req: any, res: any, next: any) => {
    next();
    // console.log('request: ', req)
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //     res.status(401).json({
    //         status: 'fail',
    //         message: 'Unauthorized',
    //     });
    // }
    // const token = authHeader.split(' ')[1];
    // try {
    //     const user = jwt.verify(token, process.env.TOKEN_KEY);
    //     req.user = user;
    //     next();
    // } catch(err) {
    //     res.status(401).json({
    //         status: 'fail',
    //         message: 'Unauthorized'
    //     })
    // }
}