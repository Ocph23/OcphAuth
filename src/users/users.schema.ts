import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  npm:String,
  userName: String,
  passwordHash: String,
  email : String,
});

schema.index({
  npm:1,
  userName: 1,
  email: 1,
}, {
  unique: true,
});

export const UsersSchema = schema;