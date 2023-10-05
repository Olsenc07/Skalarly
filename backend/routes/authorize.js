import { Router } from 'express';
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models Used
const Skalar = require('/app/backend/models/skalar');

// Is this a saved email
router.get('/emailValidation', async(req,res) => {
    let checkEmail = req.query.email;
    console.log('emailValidation', checkEmail);
    await Skalar.findOne({email: checkEmail})
    .then(search => {
        if(search){
            console.log('email found', search);
            res.status(200);
            // or change ang send json and chnage the return of observable ins ervice or something
            return true
            }
            else{
                console.log('email not found');
                res.status(200);
                return false
            }
        }).catch(err => {
            res.status(401);
            console.log('error', err);
            })
        })

// Login

export default router;