
export class UsersModel implements IUsersModel{
        firstName: string;    lastName: string;
    userName: string;
    identityNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    roles: string[];
    profiles: any[];
};


export interface IUsersModel{
    firstName:string;
    lastName:string;
    userName: string;
    identityNumber:string;
    email : string;
    password: string;
    confirmPassword: string;
    role:string;
    roles:string [];
    profiles:any[];
};
