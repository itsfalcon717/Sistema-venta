import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;
    url: string = environment.API_REST_URL;
    constructor(private router: Router, private toastr: ToastrService,private readonly _httpClient: HttpClient) {}

    login(user: any): Observable<any[]> {
        let params = new HttpParams().set('username', user.email ).set('password', user.password ) .set('grant_type', user.grant_type  );
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Basic ' + btoa('frontendapp:12345')});
       
        try {
            return this._httpClient.post<any>(this.url + '/security/oauth/token', params.toString(), { headers }).pipe(
              map((resp: any) => {
                const usuario: any[] = [];
                if (resp.status === 200) {
                 this.perfiles(resp.access_token);
                  sessionStorage.setItem('token',resp.access_token);
                  sessionStorage.setItem('nombre',resp.nombre);
                 
                //   sessionStorage.setItem('token',resp.access_token);
                  this.router.navigate(['/home']);
                  this.toastr.success('Login success');
                } 
                return resp;
              })
            );

            // const token = await Gatekeeper.loginByAuth(email, password);
            // const token:any = this._httpClient.post<any>(this.url + '/security/oauth/token', params.toString(), { headers })
            // localStorage.setItem('token', token.access_token);
            // await this.getProfile();
            // this.router.navigate(['/']);
            // this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByAuth({email, password}) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        try {
            this.user = await Gatekeeper.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }

    public get currentToken(): any {
        return sessionStorage.getItem('token');
      }

    parseJwt(data) {
    if (data != undefined && data != null && data != '') {
    var base64Url = data.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  };

  perfiles(res){
    if (res!= undefined && res != null && res != '') {
    let mensaje = this.parseJwt(res);
    let rol = this.parseJwt(res).authorities.toString();
    sessionStorage.setItem('rol', rol);
      return mensaje;
    }
  }

}
