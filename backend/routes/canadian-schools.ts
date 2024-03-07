import { Router, Request, Response } from 'express';
const router = Router();
// Models Used
import Signup from '../models/signup.js';
// Interfaces
import { BasicProvinceInterface, BasicInfo } from '../../shared/interfaces/basic-province-interface';

const dataCache: Record<string, BasicProvinceInterface | undefined> = {};

router.get('/province', async (req: Request, res: Response) => {
    const countryName = typeof req.query.country === 'string' ? req.query.country.trim() : null;
    if (!countryName) {
        return res.status(400).json({ message: 'Country query parameter is required and must be a string.' });
    }
    // Only one call to database
    console.log('req.query', req.query);
    console.log('countryName', countryName);
    const cacheKey = `provinceData-${countryName}`;
     // Check if data is already in cache to avoid unnecessary DB queries
     const cachedData = dataCache[cacheKey];
     if (cachedData) {
         console.log('Data retrieved from cache');
         return res.status(200).json({ regions: cachedData.regions.map(region => region.province) });
     }
    try {
         const countryData = await Signup.findOne({ countryName: countryName }).lean().exec() as unknown as BasicProvinceInterface;
        if (!countryData || !countryData.regions) {
            return res.status(404).json({ message: 'Country not found or no regions' });
        }
        console.log('oo', countryData);
        dataCache[cacheKey] = countryData as BasicProvinceInterface;
        const provinceData = countryData.regions.map(region => region.province);
      return res.status(200).json({ data: provinceData });
    } catch (e) {
        console.error('Query error:', e);
       return res.status(500).json({ message: 'Error fetching province data', error: e.toString() });
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
        return res.status(200).json(schoolsData);
    } catch (e) {
    console.log('find me 3', e);
    return res.status(500).json({ message: 'Error fetching final school', error: e.toString() });
    }
})

// final school step
router.get('/emails', async (req: Request, res: Response) => {
    let { country, province, type, name } = req.query as {
        country: string;
        province: string;
        type: keyof BasicProvinceInterface['regions'][number]['schoolTypes'];
        name: string;
    };
        if (typeof country !== 'string' || typeof province !== 'string' || 
        typeof type !== 'string' || typeof name !== 'string') {
        return res.status(400).json({ message: 'Missing or invalid query parameters' });
    }
    const cacheKey = `provinceData-${country}`;
    const cachedRegion = dataCache[cacheKey];
    try {
    // Check if we have cached data for the given country
        // Find the region within the cached data
        const region = cachedRegion!.regions.find(r=> r.province === province);
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
       return res.status(200).json(school.emailExtensions);
} catch (e) {
    console.log('find me 3', e);
    return res.status(500).json({ message: 'Error fetching final school', error: e.toString() });
}
});
export default router;