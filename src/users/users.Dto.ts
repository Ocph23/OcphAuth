import { Document } from 'mongoose';
export interface UsersDto extends Document {
    firstName:string;
    lastName:string;
    userName: string;
    identityNumber:string;
    email: string;
    passwordHash: string;
    roles:string [];
    role:string;
    profiles:any[];
}
