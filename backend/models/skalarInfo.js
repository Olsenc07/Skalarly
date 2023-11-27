import mongoose, { model } from 'mongoose';

const userInfoSchema = mongoose.Schema({
    username: { type: String, required: true},
    name: { type: String },
    // bio: { type: String },
    // // courseId: { type: Array},
    // // gender: { type: String },
    region: { type: String, default: null}, //state/province
    institution: { type: String},
    domains: [{type: String}],
    webPages: [{type: String}],
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
    skalar: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
 });
  
 export default model('SkalarInfo', userInfoSchema);