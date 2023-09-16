const express = require('express');
const router = express.Router();

router.get('/emailValidation', async(req,res) => {
    console.log('emailValidation');
})

module.exports = router;