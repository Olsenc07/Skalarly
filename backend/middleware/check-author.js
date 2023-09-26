import { verify } from 'jsonwebtoken';

const checkAuthor = async (reg, res, next) => {
    try {
    const token = reg.headers.authorization.split(' ')[1];
    const decodedToken = verify(token, process.env.loveistheanswer);
    reg.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
    } catch (error) {
       res.status(401).json({ message: "Your session has timed out. Please relogin!"});
    }
};
module.exports = checkAuthor;
