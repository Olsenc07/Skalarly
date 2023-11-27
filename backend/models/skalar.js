import mongoose, { model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const skalarSchema = mongoose.Schema({
   email: { type: String, required: true},
   emailToken: { type: String },
   isVerified: { type: String },
   username: { type: String, required: true},
   password: { type: String, required: true},
});
skalarSchema.plugin(uniqueValidator);

export default model('Skalar', skalarSchema);