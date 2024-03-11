import mongoose, { Document, Schema } from 'mongoose';

interface StudentEnrollment {
  fullTimeUndergraduate: number;
  partTimeUndergraduate: number;
  fullTimeGraduate: number;
  partTimeGraduate: number;
}

interface TuitionFeesCategory {
  undergraduate: number[];
  graduate: number[];
}

interface TuitionFees {
  canadianStudent: TuitionFeesCategory;
  internationalStudent: TuitionFeesCategory;
}

interface AdvancedSchoolInfoDocument extends Document {
  name: string;
  url?: string;
  studentEnrollment: StudentEnrollment;
  tuitionFees: TuitionFees;
}


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

  export default mongoose.model<AdvancedSchoolInfoDocument>('AdvancedSchoolInfo', advancedInfoSchema);