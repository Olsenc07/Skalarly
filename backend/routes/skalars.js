import { Router } from 'express';
const router = Router();
// Models Used
import { findOne } from '/app/backend/models/SkalarInfo';

// Middleware
const filterBlockedUsers = require('/app/backend/middleware/filter-blocked-skalars');



// searching skalars
router.get('/skalarsFound', filterBlockedUsers, async(req,res) => {
    const input = req.query.input;
    const userId = req.query.userId;

    console.log('search input', input);
    console.log('userId', userId);

    await findOne({username: input})
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