import { Router, Request, Response } from 'express';
const router = Router();
// Models Used
import Signup from '../models/signup.js';
// Interfaces
import { BasicProvinceInterface, BasicInfo } from '../../shared/interfaces/basic-province-interface';

const dataCache: Record<string, BasicProvinceInterface> = {};

router.get('/province', async (req: Request, res: Response) => {
    // Only one call to database
    if (typeof req.query.country === 'string') {
    const countryName = req.query.country.trim();
    console.log('req.query', req.query);
    console.log('countryName', countryName);
    const cacheKey = `provinceData-${countryName}`;
     // Check if data is already in cache to avoid unnecessary DB queries
     if (dataCache[cacheKey]) {
        console.log('Data retrieved from cache');
        return res.status(200).json(dataCache[cacheKey]);
      }
    try {
         const countryData = await Signup.findOne({countryName: countryName}).lean().exec()
        if (!countryData || !countryData.regions) {
            return res.status(404).json({ message: 'Country not found or no regions' });
        }
        console.log('oo', countryData);
        dataCache[cacheKey] = countryData as unknown as BasicProvinceInterface;
        const provinceData = countryData.regions.map(region => region.province);
        res.status(200).json({ data: provinceData });
    } catch (e) {
        console.error('Query error:', e);
        res.status(500).json({ message: 'Error fetching province data', error: e });
    }
}else {
        res.status(200).json({ data: 'Hey chazyy' });
    }
});
// Returns school names
router.get('/names', async (req: Request, res: Response) => {
    const { country, province, type } = req.query as { 
        country: string; 
        province: string; 
        type: keyof BasicProvinceInterface['regions'][number]['schoolTypes']; 
    };
    const provinceData = dataCache[`provinceData-${country}`];
    if (!provinceData) {
        return res.status(404).json({ message: 'Province data not found.' });
    }
    try {
       const region = provinceData.regions.find(r => r.province === province);
        if (!region) {
            return res.status(404).json({ message: `Province ${province} not found` });
        }
        let schoolTypeArray: BasicInfo[] = region.schoolTypes[type];
        if (!schoolTypeArray) {
            return res.status(404).json({ message: `School type not found in province ${province}` });
        }

        // Extract the names from the schoolTypeArray
        const schoolsData = schoolTypeArray.map(school => school.name);
        res.status(200).json(schoolsData);
    } catch (e) {
    console.log('find me 3', e);
    res.status(500).json({ message: 'Error fetching final school', error: e.toString() });
    }
})

// final school step
router.get('/emails', async (req, res) => {
    let { country, province, type, name } = req.query as {
        country: string;
        province: string;
        type: keyof BasicProvinceInterface['regions'][number]['schoolTypes'];
        name: string;
    };
    const cacheKey = `provinceData-${country}`;
    try {
    // Check if we have cached data for the given country
    if (dataCache[cacheKey]) {
        // Find the region within the cached data
        const region = dataCache[cacheKey].regions.find(r => r.province === province);
        if (!region) {
            return res.status(404).json({ message: `Province ${province} not found` });
        }
        const schoolTypeArray: BasicInfo[] = region.schoolTypes[type];
        if (!schoolTypeArray) {
            return res.status(404).json({ message: `School type not found in province ${province}` });
        }
        // Find the school by name within the school type array
        const normalizedQueryName = name.toLowerCase().trim();
        const school = schoolTypeArray.find(s => s.name.toLowerCase().includes(normalizedQueryName));
        if (!school) {
            return res.status(404).json({ message: `School ${name} not found` });
        }
        console.log('school', school.emailExtensions);
        res.status(200).json(school.emailExtensions);
    }  else {
            res.status(500).json({ message: 'Error fetching school data' });
        }
} catch (e) {
    console.log('find me 3', e);
    res.status(500).json({ message: 'Error fetching final school', error: e });
}
});
export default router;