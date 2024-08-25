import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IToken extends Document{
  userId: Schema.Types.ObjectId,
  token: string,
  createdAt: Date
}

export interface ITokenModel extends Model<IToken> {
}

const tokenSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
}, { timestamps: true })

const Token = mongoose.model<IToken, ITokenModel>('Token', tokenSchema);

export default Token;
