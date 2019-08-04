import * as mongoose from 'mongoose';
import { DeveleporApplication } from './developer.model';

const schema = new mongoose.Schema({
    userName: String,
    passwordHash: String,
    apps: [{
      id: String,
      name:String,
      appKey:String,
      created:Date,
      description:String,
    }],
    developerProfile:{
      firstName:String,
      lastName:String,
      company:String,
      address:{ address: String,
        port: Number,
        addressType: String},
      email : String,
    }
});

schema.index({
  userName: 1
}, {
  unique: true,
});

export const DeveloperSchema = schema;