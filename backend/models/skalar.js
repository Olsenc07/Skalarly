import mongoose from 'mongoose';

const skalarSchema = mongoose.Schema({
   email: { type: String, required: true},
   emailToken: { type: String },
   isVerified: { type: Boolean },
   username: { type: String, required: true},
   password: { type: String, required: true},
});

export default mongoose.model('Skalar', skalarSchema);