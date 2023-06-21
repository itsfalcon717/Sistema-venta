import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string = environment.API_REST_URL;
  token = sessionStorage.getItem('token');
  constructor(private readonly _httpClient: HttpClient) { }

  getUsers(){
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token });
    return this._httpClient.get<any>(this.url+'/usuarios/usuarios',{ headers });
  }

  getUserId(id:number){
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token });
    return this._httpClient.get<any>(this.url+'/usuarios/usuarios/' + id,{ headers });
  }
}
