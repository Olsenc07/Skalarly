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
    province: {type: String},
    schoolTypes: {
      universities: [basicInfoSchema],
      colleges: [basicInfoSchema],
      technicalInstitutes: [basicInfoSchema],
      theologicalSchools: [basicInfoSchema]
    }
  });
  
  const countrySchema = new mongoose.Schema({
    countryName: { type: String},
    regions: [provinceSchema]
  });

  
  export default mongoose.model('Signup', countrySchema, 'signup');