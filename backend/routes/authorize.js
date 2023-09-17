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
            res.status(200);
            // or change ang send json and chnage the return of observable ins ervice or something
            return true
            }
            else{
                res.status(200);
                return false
            }
        }).catch(err => {
            res.status(401)
            })
        })

export default router;