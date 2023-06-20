import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = environment.API_REST_URL;
  token = sessionStorage.getItem('token');
  constructor(private readonly _httpClient: HttpClient) { }

  product(){
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token });
    return this._httpClient.get<any>(this.url+'/productos/listar',{ headers });
  }
}
