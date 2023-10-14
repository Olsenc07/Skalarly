import { Router } from 'express';
const axios = require('axios');
const router = Router();

// store the universities data
let universitiesData = [];
// Define an API endpoint to fetch universities data
router.get('/countries', async (req, res) => {
  try {
    // Fetch data from the GitHub URL
    const response = await axios.get('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json');
    const universitiesData = response.data;
    // Extract the list of unique countries
     const countries = [...new Set(universitiesData.map(world => world.country))];
    //  I want Canada and USA as first two options
     countries.sort((a, b) => {
        if (a.country === 'Canada' || a.country === 'USA') {
          return -1;
        } else if (b.country === 'Canada' || b.country === 'USA') {
          return 1;
        }
        return a.country.localeCompare(b.country);
      });
    // Send the countries data as a JSON response
    res.json(countries);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
// state-provinces if not null for specific country
app.get('/countries/state-provinces', (req, res) => {
    const { country } = req.query;
  
    if (!country) {
      return res.status(400).json({ error: 'Country parameter is required' });
    }
    // get unique state-provinces for the selected country
    const stateProvinces = [...new Set(universitiesData
      .filter(university => university.country === country)
      .map(university => university['state-province']))];
    res.json(stateProvinces);
});

// fetch universities data for a specific country
app.get('/countries/country', (req, res) => {
    const { country } = req.query;
  
    if (!country) {
      return res.status(400).json({ error: 'Country parameter is required' });
    }
  
    // Filter the universities data based on the provided country
    const filteredUniversities = universitiesData.filter(university => university.country === country);
  
    res.json(filteredUniversities);
  });

export default router;