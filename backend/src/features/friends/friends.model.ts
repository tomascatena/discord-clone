import mongoose from 'mongoose';

export interface IFriend {
  _id: string;
  username: string;
  email: string;
}

const friendSchema = new mongoose.Schema<IFriend>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model<IFriend>('Friend', friendSchema);

export default Friend;
