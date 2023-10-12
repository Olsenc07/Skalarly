import { Router } from 'express';
const axios = require('axios');
const router = Router();


// Define an API endpoint to fetch universities data
router.get('/universities', async (req, res) => {
  try {
    // Fetch data from the GitHub URL
    const response = await axios.get('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json');
    const universities = response.data;
    // Send the universities data as a JSON response
    res.json(universities);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;