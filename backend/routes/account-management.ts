import { Router } from 'express';
const router = Router();
// Models Used
import Skalar from '../models/login';

// Has this username already been used?
router.get('/uniqueUserName', async(req,res) => {
    let userName = req.query['username'];
    console.log('uniqueUserName', userName);
    await Skalar.findOne({user: userName})
    .then((search: any) => {
        if(search){
            console.log('username', search);
            res.status(200);
            return true
            }
            else{
                console.log('username not found, can use');
                res.status(200);
                return false
            }
        }).catch((err: any) => {
            res.status(401);
            console.log('error', err);
            })
        })
// verify account once 7 digits have been imported
router.get('/verifyAccount', async (req) => {
    const token = req.query['token'];
    const user = await Skalar.findOne({ emailToken: token });
    if (user) {
        user.emailToken = '';
        user.isVerified = true;
        await user.save()
    //   return true and go to next page or close verify pop up..
       
    } else {
        // return false and say below..
        console.log('Invalid authentication. Please try again.');

    }

});

//delete uncompleted signup
router.delete('deleteUncompletedSignUp', async (req, res) => {
    try {
        const email = req.body.email; // Get email from the request body
    
        // Perform the findOneAndDelete operation based on the email
        const result = await Skalar.findOneAndDelete({ email });
        if (result) {
          // Data was deleted successfully
          res.status(200).json({ message: 'Data deleted successfully' });
        } else {
          // Data was not found or deleted
          res.status(404).json({ message: 'Data not found' });
        }
      } catch (error) {
        // Handle errors
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})
export default router;