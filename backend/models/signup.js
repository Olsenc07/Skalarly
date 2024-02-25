import mongoose from 'mongoose';

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