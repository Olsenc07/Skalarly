import { Schema, model } from 'mongoose';

const userInfoSchema = Schema({
    username: { type: String, required: true},
    name: { type: String },
    // bio: { type: String },
    // // courseId: { type: Array},
    // // gender: { type: String },
    institution: { type: String},
    // birthday: { type: String},
    // major: { type: String},
    // minor: { type: String},
    // sport: { type: String},
    // club: { type: String},
    // publicAccount: { type: Boolean},
    // // pronouns: { type: String},
    // Followers: { type: Number},
    // Following: { type: Number},
    // ProfilePicPath: { type: String},
    // cloudinary_id: { type: String},
    // Creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
 });
  
 export default model('SkalarInfo', userInfoSchema);