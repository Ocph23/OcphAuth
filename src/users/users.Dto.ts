import { Document } from 'mongoose';
import { IUsersModel } from './users.model';
export interface UsersDto extends  IUsersModel,Document {
    passwordHash: string;
}
