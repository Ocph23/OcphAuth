import { Address } from "cluster";
import { Guid } from "guid-typescript";

export class DeveloperModel{
    userName: string;
    passwordHash: string;
    apps: DeveleporApplication [];
    developerProfile:DeveloperProfile;
};

export class DeveloperProfile{
    firstName:string;
    lastName:string;
    company:string;
    address:Address;
    email : string;
}

export class DeveleporApplication{
    id: string;
    name:string;
    appKey:string;
    created:Date |number;
    description:string;
    constructor() {
       if(!this.id)
       {
        this.id = Guid.create().toString();
        this.created=Date.now();
       }
    }


}
