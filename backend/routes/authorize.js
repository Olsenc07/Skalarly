import { Router } from 'express';
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.get('/emailValidation', async(req,res) => {
    console.log('emailValidation');
})

export default router;