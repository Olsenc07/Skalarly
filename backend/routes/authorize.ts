import { Router } from 'express';
const router = Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Models Used
import Login from '../models/login.js';
import SkalarInfo from '../models/skalarInfo.js';
// Middleware
import verifyEmail from '../middleware/verify-email.js';

// Login
// verify email can be done when seeing if email exist
// could siplay hint or error saying to verify it
router.post("/login", verifyEmail, async(reg, res) => {
    // let fetchedUser: { password: any; email: any; _id: any; };
    // await connectAuthDB();
    // try{ 
    // console.log('login body', reg.body);
    // console.log('login body stayloggedin', reg.body.stayLoggedIn);
    // const skalarUser = await Login.findOne({ email: reg.body.email })
    // if (!skalarUser) {
    //     throw new Error('Authentication failed, user not found.');
    // }
    // const userInfo = await SkalarInfo.findOne({ username: skalarUser.username });
    // console.log('userInfo', userInfo);

    // if (!userInfo) {
    //     await User.findOneAndDelete({ email: req.body.email });
    //     throw new Error("Your account was not completed when it was made. Please make it again!");
    // }

    // fetchedUser = await User.findOne({ email: req.body.email });
    // const passwordMatch = await bcrypt.compare(req.body.password, fetchedUser.password);

    // if (!passwordMatch) {
    //     throw new Error("Authentication failed");
    // }

    // const expiresIn = req.body.stayLoggedIn ? 3.154e+10 : 2.88e+7; // Stay logged in or not
    // const token = jwt.sign(
    //     { email: fetchedUser.email, userId: fetchedUser._id },
    //     process.env.love,
    //     { expiresIn: expiresIn }
    // );
    //         res.status(200).json({
    //             token: token,
    //             expiresIn: 2.88e+7,
    //             userId: fetchedUser._id
    //         });
    // } catch (error) {
    //     console.error(error);
    //     res.status(401).json({
    //         message: error.message || "Invalid authentication credentials!"
    //     });
    // } finally {
    //     await mongooseAuth.close();
    // }
});

// stayLoggedIn
router.post("/stayLoggedIn",  async(reg, res) => {
//     console.log('got the jam', reg.body.UserId);
//    await Skalar.findOne({ _id: reg.body.UserId })
//     .then(user => {
//             fetchedUser = user;
//     const token = jwt.sign(
//         { email: fetchedUser.email, userId: fetchedUser._id },
//         process.env.love,
//         { expiresIn: 2.88e+7 }
//     );
//     res.status(200).json({
//         token: token,
//         expiresIn: 2.88e+7,
//         userId: fetchedUser._id
//     });
// })  .catch(() => {
//      res.status(401).json({
//         message: "Invalid authentication credentials!",

//     });
// });
});

export default router;