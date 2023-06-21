import { IRoles } from "./iroles";
import { IuserLinks } from "./iuser-links";
export interface IUsers {
    id?:number;
    username:string;
    password:string;
    enabled:boolean;
    nombre:string;
    apellido:string;
    email:string;
    roles:IRoles[];
    _links:IuserLinks;
}
