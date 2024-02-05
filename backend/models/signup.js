import mongoose from 'mongoose';

const advancedInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String },
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

const basicInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailExtensions: [{ type: String }]
});

const provinceSchema = new mongoose.Schema({
    province: {type: String},
    schoolTypes: {
      University: [basicInfoSchema],
      College: [basicInfoSchema],
      Technical: [basicInfoSchema],
      Theological: [basicInfoSchema]
    }
  });
  
  const countrySchema = new mongoose.Schema({
    countryName: { type: String},
    regions: [provinceSchema]
  });

  
  export default mongoose.model('Signup', countrySchema, 'signup');