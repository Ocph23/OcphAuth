
export interface IDeveloperModel{
userId:string;
createDate:Date|string;
companyName: string;
author:string;
email : string;
apps:[];
};


export interface IUserApplication{
    createDate: Date|string;
    appName:string;
    version:string;
    description:string;
    appKey :string;
    userId: string, 
}
