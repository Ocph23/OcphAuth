import { Document } from 'mongoose';
import { IDeveloperModel, IUserApplication } from './developer.model';

export interface DeveleporDTO extends IDeveloperModel, Document {}

export interface AppDTO extends IUserApplication, Document {
    
}
