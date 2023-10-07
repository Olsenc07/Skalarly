import { Router } from 'express';
const router = Router();
// Models Used
import { findOne, findOneAndDelete } from '/app/backend/models/skalar';

// Is this a new email?
// also used for login to find if email exists
router.get('/emailValidation', async(req,res) => {
    let checkEmail = req.query.email;
    console.log('emailValidation', checkEmail);
    await findOne({email: checkEmail})
    .then(search => {
        if(search){
            console.log('email found', search);
            res.status(200);
            // or change ang send json and chnage the return of observable in service or something
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

// Has this username already been used?
router.get('/uniqueUserName', async(req,res) => {
    let userName = req.query.username;
    console.log('uniqueUserName', userName);
    await findOne({user: userName})
    .then(search => {
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
        }).catch(err => {
            res.status(401);
            console.log('error', err);
            })
        })
// verify account
router.get('/verifyAccount', async (req, res, next) => {
    const token = req.query.token;
    const user = await findOne({ emailToken: token });
    if (user) {
        user.emailToken = null;
        user.isVerified = 'true';
        await user.save()
    //   return true and go to next page or close verify pop up..
       
    } else {
        // return false and say below..
        console.log('Invalid authentication. Please try again.');

    }

});

//delete uncompleted signup
router.delete('deleteUncompletedSignUp', async (req, res, next) => {
    try {
        const email = req.body.email; // Get email from the request body
    
        // Perform the findOneAndDelete operation based on the email
        const result = await findOneAndDelete({ email });
    
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
