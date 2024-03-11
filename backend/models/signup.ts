import mongoose, { Document, Schema } from 'mongoose';

interface BasicInfo {
  name: string;
  emailExtensions: string[];
}

interface Province {
  province: string;
  schoolTypes: {
    University: BasicInfo[];
    College: BasicInfo[];
    Technical: BasicInfo[];
    Theological: BasicInfo[];
  };
}

interface CountryDocument extends Document {
  countryName: string;
  regions: Province[];
}
const basicInfoSchema = new Schema<BasicInfo>({
  name: { type: String, required: true },
  emailExtensions: [{ type: String }]
});

const provinceSchema = new Schema<Province>({
  province: { type: String },
  schoolTypes: {
    University: [basicInfoSchema],
    College: [basicInfoSchema],
    Technical: [basicInfoSchema],
    Theological: [basicInfoSchema]
  }
});

const countrySchema = new Schema<CountryDocument>({
  countryName: { type: String },
  regions: [provinceSchema]
});

export default mongoose.model<CountryDocument>('Signup', countrySchema, 'signup');
