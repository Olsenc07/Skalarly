import mongoose from 'mongoose';

const userInfoSchema = mongoose.Schema({
    username: { type: String, required: true},
    name: { type: String },
    bio: { type: String },
    region: { type: String, default: null}, //state/province
    institution: { type: String},
    webPages: [{type: String}],
    birthday: { type: String},
    major: [{ type: String}],
    minor: [{ type: String}],
    sport: [{ type: String}],
    club: [{ type: String}],
    socialLinks: [
        { platform: { type: String, required: true }, 
        url: { type: String, required: true } }
    ],
    publicAccount: { type: Boolean},
    Followers: { type: Number, default: 0},
    Following: { type: Number, default: 0},
    // ProfilePicPath: { type: String},
    // cloudinary_id: { type: String},
    blocklist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    skalar: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
 });
  
 const SkalarInfo = mongoose.model('SkalarInfo', userInfoSchema);

export { SkalarInfo };