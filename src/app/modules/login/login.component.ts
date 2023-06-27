import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    // public isGoogleLoading = false;
    // public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private router: Router
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required),
            grant_type: new UntypedFormControl('password')
        });
    }

     loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            // await this.appService.loginByAuth(this.loginForm.value);
            // const user = { username: this.name, password: this.password,grant_type:'password'};
              this.appService.login(this.loginForm.value).subscribe(
                (resp:any) => {
                localStorage.setItem('token',resp.access_token);
                localStorage.setItem('nombre',resp.nombre);
              
                this.isAuthLoading = false;
                this.router.navigate(['/']);
                this.toastr.success('Acceso correcto');
            },
            (err)=>{
                this.toastr.warning('error en acceso');
            }
            
            );
          
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    // async loginByGoogle() {
    //     this.isGoogleLoading = true;
    //     await this.appService.loginByGoogle();
    //     this.isGoogleLoading = false;
    // }

    // async loginByFacebook() {
    //     this.isFacebookLoading = true;
    //     await this.appService.loginByFacebook();
    //     this.isFacebookLoading = false;
    // }

    // ngOnDestroy() {
    //     this.renderer.removeClass(
    //         document.querySelector('app-root'),
    //         'login-page'
    //     );
    // }
}
