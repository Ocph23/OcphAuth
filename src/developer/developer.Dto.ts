import { Document } from 'mongoose';
import { DeveloperProfile, DeveleporApplication } from './developer.model';

export interface DeveloperDto extends Document {
    id:string;
    userName: string;
    passwordHash: string;
    apps: DeveleporApplication [],
    developerProfile:DeveloperProfile;
}
