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

  export default mongoose.model('AdvancedSchoolInfo', advancedInfoSchema);