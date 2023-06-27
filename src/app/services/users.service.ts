import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string = environment.API_REST_URL;
  constructor(private readonly _httpClient: HttpClient) { }

  getUsers(){
    return this._httpClient.get<any>(this.url+'/usuarios/usuarios');
  }

  getUserId(id:number){
    return this._httpClient.get<any>(this.url+'/usuarios/usuarios/' + id);
  }
  deleteUser(id:number){
    return this._httpClient.delete<any>(this.url+'/usuarios/usuarios/' + id);
  }
  createUser(user:object){
    return this._httpClient.post<any>(this.url+'/usuarios/usuarios',user);
  }
  UpdateUser(user:object,id:Number){
    return this._httpClient.put<any>(this.url+'/usuarios/usuarios/' + id,user);
  }
}
