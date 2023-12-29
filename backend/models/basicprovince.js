import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema({
    province: { type: String, required: true },
    schoolTypes: {
      universities: [basicInfoSchema],
      colleges: [basicInfoSchema],
      technicalInstitutes: [basicInfoSchema],
      theologicalSchools: [basicInfoSchema]
    }
  });
  
  const basicProvincesSchema = new mongoose.Schema({
    provinces: [provinceSchema]
  });
  
  export default mongoose.model('BasicProvince', basicProvincesSchema);