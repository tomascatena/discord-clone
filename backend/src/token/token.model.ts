import { PersistedTokenTypes, tokenTypes } from '@config/tokens';
import mongoose, { ObjectId, Schema } from 'mongoose';

export interface IToken {
  _id: string;
  token: ObjectId;
  user: ObjectId;
  type: PersistedTokenTypes;
  expires: Date;
  blacklisted: boolean;
}

const tokenSchema = new Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;
