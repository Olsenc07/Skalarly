import { Router } from 'express';
const router = Router();
// Models Used
import Signup from '../models/signup.js';

router.get('/province', async (req, res) => {
    console.log('sweeter', req.query.country);
    let countryName = req.query.country;
    try {
         const countryData = await Signup.findOne({countryName: countryName}).exec()
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
router.get('/schoolTypes', async (req, res) => {
    let countryName = req.query.country;
    let province = req.query.province;
    let type = req.query.type;

    console.log('o wo wo', countryName);
    try {
        // test one at a time and learn layering
        // const finalList = await Signup.findOne( {$and: [
        //     {countryName: countryName}, {'regions.province': province}, {'regions.province.schoolTypes': type}
        // ]}).exec()
        console.log('countryData', finalList);
       if (!finalList || !finalList.name) {
           return res.status(404).json({ message: 'School not found' });
       }
       const names = finalList.map(specific => specific.name);
       res.status(200).json({ data: names });
   } catch (e) {
       console.log('find me 2', e);
       res.status(500).json({ message: 'Error fetching province data', error: e });
   }
});
export default router;