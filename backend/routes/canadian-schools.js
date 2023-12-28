import { Router } from 'express';
const router = Router();

router.get('/province', async (req, res) => {
    try {
        const database = client.db('canada');
        const provinces = database.collection('basic_province');
        const provinceData = await provinces.findOne({ name: 'Provinces of Canada' });
        const provinceNames = provinceData.provinces.map(province => province.name);

        res.json(provinceNames);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching province data', error: e });
    }
});