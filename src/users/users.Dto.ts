import { Document } from 'mongoose';
export interface UsersDto extends Document {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    passwordHash: string;
}
