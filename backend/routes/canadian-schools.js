import { Router } from 'express';
const router = Router();
// Models Used
import Signup from '../models/signup.js';

router.get('/province', async (req, res) => {
    console.log('sweeter', req.query.country);
    let countryName = req.query.country;
    try {
        // look at old project {countryName: countryName}
         const countryData = await Signup.findOne().exec()
         console.log('countryData', countryData);
        if (!countryData || !countryData.regions) {
            return res.status(404).json({ message: 'Country not found or no regions' });
        }
        const provinceData = countryData.regions.map(region => region.province);
        res.status(200).json({ data: provinceData });
    } catch (e) {
        console.log('find me 2', e);
        res.status(500).json({ message: 'Error fetching province data', error: e });
    }
});
export default router;