import { Router } from 'express';
const router = Router();
// Models Used
import { find, findOne } from '/app/backend/models/SkalarInfo';

// Middleware
const filterBlockedUsers = require('/app/backend/middleware/filter-blocked-skalars');

// searching self
router.get('/selfInfo', async(req,res) => {
    await findOne({Creator: req.query.userId})
        // .select('-password') if i was fetching user info, dont want password passed on front end
        .then(documents => {
            res.status(200).json({
                message: 'Users fetched succesfully!',
                infos: documents
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching users failed!'
            });
        });
})
// searching skalars
router.get('/skalarsInfo', filterBlockedUsers, async(req,res) => {
    const input = req.query.input;
    // From Middleware
    const filteredQuery = req.filteredQuery;

    console.log('search input', input);
    console.log('filteredQuery', filteredQuery);

    await find({ $and: [
        {
     username: { // searching for skalar
        $regex: new RegExp(input,'gi')
                }
            },
            filteredQuery
            ]
        }).limit(7)
        .then(skalars => {
            if(skalars){
                console.log('skalars found', skalars);
                res.status(200).send(skalars)
            }
        })
        .catch(err =>{
            return res.status(401).json({
                message: 'No skalar found', err
            })
        })
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