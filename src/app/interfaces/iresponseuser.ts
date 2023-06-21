import { IEmbedded } from "./iembedded";
import { ILink } from "./ilink";
import { IPage } from "./ipage";

export interface IResponseUser {
    _embedded:IEmbedded;
    _links:ILink;
    page:IPage;
}
