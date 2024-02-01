import { Router } from 'express';
const router = Router();
// Models Used
import  SkalarInfo  from '../models/skalarinfo.js';

// Middleware
// import filterBlockedUsers  from '../middleware/filter-blocked-skalars.js';

// searching self
router.get('/selfInfo', async(req,res) => {
    await SkalarInfo.findOne({Creator: req.query.userId})
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
// finding skalars info for thier profile filterBlockedUsers
router.get('/skalarsInfo', async(req,res) => {
    const idProfile = req.query.id;
    // From Middleware
    const cancelNavigation = req.blocked;
    console.log('ID', idProfile);
    console.log('filteredQuery', filteredQuery);

    if (cancelNavigation) {
        return res.status(400).json({ message: '' });
      }
      try {
        isUserBlocked = req.blocked
        if (isUserBlocked) {
            return res.status(403).json({
              message: `You do not have permission to access this user's profile.`

            });
          }
        const skalars = await SkalarInfo.findById(idProfile).exec();
        if (skalars) {
          console.log('Skalar found', skalars);
          res.status(200).json(skalars);
        } else {
          res.status(404).json({
            message: 'No Skalar found',
          });
        }
      } catch (err) {
        console.error('Error finding Skalar:', err);
        res.status(500).json({
          message: 'Internal server error',
        });
      }
})
// searching skalars filterBlockedUsers
router.get('/skalarsInfoSearch', async(req,res) => {
    const input = req.query.input;
    // From Middleware
    const filteredQuery = req.filteredQuery;
    console.log('search input', input);
    console.log('filteredQuery', filteredQuery);
    await SkalarInfo.find({ $and: [
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
                res.status(200).json(skalars)
            }
        })
        .catch(err =>{
            return res.status(401).json({
                message: 'No skalar found', err
            })
        })
})

export default router;