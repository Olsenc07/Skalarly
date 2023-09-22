import { Router } from 'express';
const router = Router();

// Models Used
const SkalarInfo = require('/app/backend/models/SkalarInfo');


// Is this a saved email
router.get('/emailValidation', async(req,res) => {
    let input = req.query.input;
    console.log('search input', input);
    await SkalarInfo.findOne({username: input})
    // make efficent search, non case sensitive?
    // look at old code
    // .then(search => {
    //     if(search){
    //         console.log('email found', search);
    //         res.status(200);
    //         // or change ang send json and chnage the return of observable ins ervice or something
    //         return true
    //         }
    //         else{
    //             console.log('email not found');
    //             res.status(200);
    //             return false
    //         }
    //     }).catch(err => {
    //         res.status(401);
    //         console.log('error', err);
    //         })
    //     })
})

export default router;