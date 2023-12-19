import mongoose, { model } from 'mongoose';

const skalarSchema = mongoose.Schema({
   email: { type: String, required: true},
   emailToken: { type: String },
   isVerified: { type: String },
   username: { type: String, required: true},
   password: { type: String, required: true},
});

export default model('Skalar', skalarSchema);