import { Router } from 'express';
const router = Router();
// Models Used
import BasicProvince from '../models/basicprovince.js';

router.get('/province', async (req, res) => {
    try {
        const provincesData = await BasicProvince.find();
        res.status(200).json(provincesData);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching province data', error: e });
    }
});
