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
router.get('/schoolType', async (req, res) => {
    try {
        const province = req.query.province;
        if (!province) {
            return res.status(400).json({ message: "Province is required" });
        }

        const database = client.db('canada');
        const provinces = database.collection('basic_province');
        const provinceData = await provinces.findOne({ name: 'Provinces of Canada' });

        const selectedProvince = provinceData.provinces.find(p => p.name === province);
        if (!selectedProvince) {
            return res.status(404).json({ message: "Province not found" });
        }

        const schoolTypes = Object.keys(selectedProvince).filter(key => Array.isArray(selectedProvince[key]));
        res.json(schoolTypes);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching school types', error: e });
    }
});

router.get('/schoolName', async (req, res) => {
    try {
        const province = req.query.province;
        const schoolType = req.query.schoolType;

        if (!province || !schoolType) {
            return res.status(400).json({ message: "Province and school type are required" });
        }

        const database = client.db('canada');
        const provinces = database.collection('basic_province');
        const provinceData = await provinces.findOne({ name: 'Provinces of Canada' });

        const selectedProvince = provinceData.provinces.find(p => p.name === province);
        if (!selectedProvince || !selectedProvince[schoolType]) {
            return res.status(404).json({ message: "School type not found in the selected province" });
        }

        const schoolNames = selectedProvince[schoolType].map(school => school.name);
        res.json(schoolNames);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching school names', error: e });
    }
});
