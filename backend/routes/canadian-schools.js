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
        const finalList = await Signup.findOne({countryName: countryName}).exec();
      if(finalList){
        let region = finalList.regions.map(r => r.province === province);
            if (!region) {
                return res.status(404).json({ message: `Province ${province} not found` });
            }

            let schoolTypeArray = region.schoolTypes[type];
            if (!schoolTypeArray) {
                return res.status(404).json({ message: `School type ${type} not found in province ${province}` });
            }

        const schoolsData = schoolType.map(school => ( school.emailExtensions));
        console.log('schoolsData:', schoolsData);

        res.status(200).json(schoolsData);
      } else{
        res.status(500).json({ message: 'Error fetching school data', error: e });
      }
  
} catch (e) {
    console.log('find me 3', e);
    res.status(500).json({ message: 'Error fetching final school', error: e });
}
});
export default router;