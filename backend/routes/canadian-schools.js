import { Router } from 'express';
const router = Router();
// Models Used
import Signup from '../models/signup.js';

const dataCache = {};

router.get('/province', async (req, res) => {
    // Only one call to database
    const countryName = req.query.country.trim();
    console.log('req.query', req.query);
    console.log('countryName', countryName);
    console.log('Signup', Signup);

    const cacheKey = `provinceData-${countryName}`;
    try {
         const countryData = await Signup.findOne({countryName: countryName}).exec()
        if (!countryData || !countryData.regions) {
            return res.status(404).json({ message: 'Country not found or no regions' });
        }
        console.log('oo', countryData);
        dataCache[cacheKey] = countryData;
        const provinceData = countryData.regions.map(region => region.province);
        res.status(200).json({ data: provinceData });
    } catch (e) {
        console.error('Query error:', error);
        res.status(500).json({ message: 'Error fetching province data', error: e });
    }
});
router.get('/names', async (req, res) => {
    let { country, province, type } = req.query;
    console.log('reached', req.query);
    const provinceData = dataCache[`provinceData-${country}`];
    if (!provinceData) {
        return res.status(404).json({ message: 'Province data not found.' });
    }

    try {
        console.log('provinceData', provinceData.regions);

       let region = provinceData.regions.find(r => r.province === province);
        if (!region) {
            return res.status(404).json({ message: `Province ${province} not found` });
        }
        console.log('region', region);
        let schoolTypeArray = region.schoolTypes[type];
        if (!schoolTypeArray) {
            return res.status(404).json({ message: `School type ${type} not found in province ${province}` });
        }

        // Extract the names from the schoolTypeArray
        const schoolsData = schoolTypeArray.map(school => school.name);
        if (!schoolsData) {
            return res.status(404).json({ message: `School ${name} not found` });
        }
        console.log('Schools Data:', schoolsData);

        res.status(200).json(schoolsData);
  
} catch (e) {
    console.log('find me 3', e);
    res.status(500).json({ message: 'Error fetching final school', error: e });
}
})

// final school step
router.get('/emails', async (req, res) => {
    let { country, province, type, name } = req.query;
    console.log('name', name);
    const cacheKey = `provinceData-${country}`;
    try {
    // Check if we have cached data for the given country
    if (dataCache[cacheKey]) {
        // Find the region within the cached data
        const region = dataCache[cacheKey].regions.find(r => r.province === province);
        if (!region) {
            return res.status(404).json({ message: `Province ${province} not found` });
        }
        let schoolTypeArray = region.schoolTypes[type];
        if (!schoolTypeArray) {
            return res.status(404).json({ message: `School type ${type} not found in province ${province}` });
        }
        console.log('schoolTypeArray', schoolTypeArray);
        console.log('name', name);

        // Find the school by name within the school type array
        const normalizedQueryName = name.toLowerCase().trim();
        const school = schoolTypeArray.find(s => s.name.toLowerCase().includes(normalizedQueryName));
        if (!school) {
            return res.status(404).json({ message: `School ${name} not found` });
        }
        console.log('school', school.emailExtensions);

        // Get the email extensions for the school
        const emails = school.emailExtensions;
        if (!emails || emails.length === 0) {
            return res.status(404).json({ message: `Email extensions for ${name} not found` });
        }

        console.log('Emails:', emails);
        res.status(200).json(emails);
    }  else {
            res.status(500).json({ message: 'Error fetching school data' });
        }
  
} catch (e) {
    console.log('find me 3', e);
    res.status(500).json({ message: 'Error fetching final school', error: e });
}
});
export default router;