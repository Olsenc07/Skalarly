import mongoose, { Document, Schema } from 'mongoose';

interface ILogin extends Document {
   email: string;
   emailToken: string;
   isVerified: Boolean;
   username: string;
   password: string;
}

const loginSchema: Schema = new Schema({
   email: { type: String, required: true},
   emailToken: { type: String },
   isVerified: { type: Boolean },
   username: { type: String, required: true},
   password: { type: String, required: true},
});

export default mongoose.model<ILogin>('Login', loginSchema);