import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  identityNumber:String,
  userName: String,
  passwordHash: String,
  email : String,
  roles:[],
  profiles:[],
});

schema.index({
  identityNumber:1,
  userName: 1,
  email: 1,
}, {
  unique: true,
});

export const UsersSchema = schema;