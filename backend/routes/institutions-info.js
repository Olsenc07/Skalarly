import { Router } from 'express';
import axios from 'axios';

const router = Router();

// store the universities data
let universitiesData = [];
// Define an API endpoint to fetch universities data
router.get('/countries', async(req, res) => {
  console.log('hey')
  try {
    // Fetch data from the GitHub URL
    const response = await axios.get('http://universities.hipolabs.com/search');
    const universitiesData = response.data;
    // Extract the list of unique countries
     const countriesSet = [...new Set(universitiesData.map(world => world.country))];
     let countries = Array.from(countriesSet);
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
router.get('/countries/state-provinces', (req, res) => {
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
router.get('/countries/country', (req, res) => {
    const { country } = req.query;
  
    if (!country) {
      return res.status(400).json({ error: 'Country parameter is required' });
    }
  
    // Filter the universities data based on the provided country
    const filteredUniversities = universitiesData.filter(university => university.country === country);
  
    res.json(filteredUniversities);
  });

router.get('/institutions/details', (req, res) => {
  const { country, name } = req.query;

  if (!country || !name) {
    return res.status(400).json({ error: 'Country and institution name parameters are required' });
  }

  // Find the institution with the matching country and name
  const institution = universitiesData.find((item) => item.country === country && item.name === name);

  if (institution) {
    res.json(institution);
  } else {
    res.status(404).json({ error: 'Institution not found' });
  }
});


export default router;