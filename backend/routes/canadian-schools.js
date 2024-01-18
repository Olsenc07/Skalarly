import { Router } from 'express';
const router = Router();
// Models Used
import BasicProvince from '../models/basicprovince.js';

router.get('/province', async (req, res) => {
    try {
        console.log('find me');
        const provincesData = await BasicProvince.find();
        res.status(200).json(provincesData);
    } catch (e) {
        console.log('find me 2', e);
        res.status(500).json({ message: 'Error fetching province data', error: e });
    }
});

export default router;