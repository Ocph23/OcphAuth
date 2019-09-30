import * as mongoose from 'mongoose';

const appschema = new mongoose.Schema({
  _id:String,
  createDate: Date,
  appName:String,
  version:String,
  description:String,
  appKey :String,
  userId: String, 
})

const schema = new mongoose.Schema({
  userId: String, 
  createDate: String,
  companyName: String,
  author: String,
  email: String,
  apps: [{type:mongoose.Schema.Types.ObjectId, ref: "Apps"}]
});

schema.index({
  userId:1,
}, {
  unique: true,
});

export const DeveloperSchema =schema;
export const AppSchema=appschema;