import { Router } from 'express';
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models Used
import { findOne } from '/app/backend/models/skalar';

// Login
// verify email can be done when seeing if email exist
// could siplay hint or error saying to verify it
router.post("/login", verifyEmail, async(reg, res, next) => {
    let fetchedUser;
    console.log('login body', reg.body);
    console.log('login body stayloggedin', reg.body.stayLoggedIn);


    await findOne({ email: reg.body.email })
    .then(test1 => {
        console.log('test1', test1)
        UserInfo.findOne({username: test1.username})
        .then( userInfo => {
            console.log('userInfo', userInfo)
            if (!userInfo ) {
                 User.findOneAndDelete( {email: reg.body.email})
                 .then(()=> {
                 res.status(401).json({
                    message: "Your account was not completed when it was made. Please make it again!"
                });
            })}
if(userInfo){
    if(reg.body.stayLoggedIn == false){
    User.findOne({ email: reg.body.email })
        .then(user => {
                fetchedUser = user;
                return bcrypt.compare(reg.body.password, user.password)
        })   
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.love,
                { expiresIn: 2.88e+7 }
            );
            res.status(200).json({
                token: token,
                expiresIn: 2.88e+7,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!",

            });
        });
    }else{
        User.findOne({ email: reg.body.email })
        .then(user => {
                fetchedUser = user;
                return bcrypt.compare(reg.body.password, user.password)
        })   
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.love
            );
            res.status(200).json({
                token: token,
                expiresIn: 3.154e+10,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!",

            });
        });
    }
    }
})
})
});

// stayLoggedIn
router.post("/stayLoggedIn",  async(reg, res, next) => {
    console.log('got the jam', reg.body.UserId);
   await User.findOne({ _id: reg.body.UserId })
    .then(user => {
            fetchedUser = user;
    const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.love,
        { expiresIn: 2.88e+7 }
    );
    res.status(200).json({
        token: token,
        expiresIn: 2.88e+7,
        userId: fetchedUser._id
    });
})  .catch(err => {
     res.status(401).json({
        message: "Invalid authentication credentials!",

    });
});
});

export default router;