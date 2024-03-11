// Path: /backend/models/SkalarInfo.ts
import mongoose, { Schema, Document } from 'mongoose';
import { SkalarInfoInterface, SocialLink } from '../../shared/interfaces/skalars-info-interface';

// Convert your SkalarInfoInterface to a type suitable for Mongoose schema definition
type SkalarInfoModelType = SkalarInfoInterface & Document;

const socialLinkSchema = new Schema<SocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
});

const skalarInfoSchema = new Schema<SkalarInfoModelType>({
  username: { type: String, required: true },
  name: String,
  bio: String,
  region: String,
  institution: String,
  webPages: [String],
  birthday: String,
  major: [String],
  minor: [String],
  sport: [String],
  club: [String],
  socialLinks: [socialLinkSchema],
  publicAccount: Boolean,
  followers: Number,
  following: Number,
  completedCourses: [String],
  pursuingCourses: [String],
  profilePic: [String],
  cloudinaryId: { type: String},
  blocklist: [{ type: Schema.Types.ObjectId }],
  skalar: { type: Schema.Types.ObjectId, required: true },
});
// 20 ish, see if can break down!!
export default mongoose.model<SkalarInfoModelType>('SkalarInfo', skalarInfoSchema);  