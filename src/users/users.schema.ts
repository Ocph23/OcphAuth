import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userName: String,
  passwordHash: String,
  firstName:String,
  lastName:String,
  email : String,
});

schema.index({
  userName: 1,
  email: 1,
}, {
  unique: true,
});

export const UsersSchema = schema;