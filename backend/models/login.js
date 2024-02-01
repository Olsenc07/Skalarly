import mongoose from 'mongoose';

const loginSchema = mongoose.Schema({
   email: { type: String, required: true},
   emailToken: { type: String },
   isVerified: { type: Boolean },
   username: { type: String, required: true},
   password: { type: String, required: true},
});

export default mongoose.model('Login', loginSchema);