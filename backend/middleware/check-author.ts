// import { verify } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// const checkAuthor = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized: Missing authorization token.' });
//     }
//     const decodedToken = verify(token, process.env['LoveIsTheAnswer']);

//     if (!decodedToken) {
//       return res.status(401).json({ message: 'Unauthorized: Invalid authorization token.' });
//     }

//     req.userData = { email: decodedToken.email, userId: decodedToken.userId };
//     next();
//   } catch (error) {
//     console.error('Error in checkAuthor middleware:', error);
//     res.status(401).json({ message: 'Unauthorized: Invalid authorization token.' });
//   }
// };

// export default checkAuthor;
