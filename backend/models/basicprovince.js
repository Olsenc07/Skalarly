import mongoose from 'mongoose';

const basicInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  studentEnrollment: {
    fullTimeUndergraduate: { type: Number, default: 0 },
    partTimeUndergraduate: { type: Number, default: 0 },
    fullTimeGraduate: { type: Number, default: 0 },
    partTimeGraduate: { type: Number, default: 0 },
  },
  tuitionFees: {
    canadianStudent: {
      undergraduate: [{ type: Number }],
      graduate: [{ type: Number }]
    },
    internationalStudent: {
      undergraduate: [{ type: Number }],
      graduate: [{ type: Number }]
    }
  }
});

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