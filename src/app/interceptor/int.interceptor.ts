import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
declare const Buffer: { from: (arg0: string, arg1: string) => string; };
@Injectable()
export class IntInterceptor implements HttpInterceptor {

  constructor() {}
 

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     console.log("paso por interceptor");

     return next.handle(request).pipe(
       
     );
   //  const token = JSON.parse(localStorage.getItem('token')!).token;
    // let token = sessionStorage.getItem('token');
    // //let des = JSON.parse(atob(token.split(".")[1]));
    // const buffer =  JSON.parse(Buffer.from(token.split('.')[1],"base64"));
    // console.log('token1',localStorage.getItem("token")) 
  //   return next.handle(request).pipe(
  //     tap((event: HttpEvent<any>) => {   
  //     // Verificar si la respuesta contiene el token     
  //     if (event instanceof HttpResponse) {
                
  //     const token = event.headers.get('Authorization');
  //     console.log('token2',localStorage.getItem("token"))       
  //  //   console.log("interceptor", request);
  //     // console.log('token3',localStorage.getItem("token")) 
  //     // Hacer algo con el token, como almacenarlo en el almacenamiento local (localStorage)
  //             }
  //           })
  //         );
  }
  
}
