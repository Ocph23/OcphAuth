import { Document } from 'mongoose';
export interface UsersDto extends Document {
    userName: string;
    npm:string;
    email: string;
    passwordHash: string;
}
