import { IResponseUser } from '@/interfaces/iresponseuser';
import { IUsers } from '@/interfaces/iusers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '@services/users.service';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';
import { Rol } from '@/utils/utils';
import * as bcrypt from 'bcryptjs';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
    listaUsers: IResponseUser[] = [];
    page: IResponseUser[] = [];
    users: string = 'Crear';
    rol = Rol;
    form: FormGroup;
    Validate = false;
    id:number;
    constructor(
        private userService: UsersService,
        public fb: FormBuilder,
        private serviceModal: NgbModal
    ) {}

    ngOnInit() {
        this.cargarForm();
        this.getUsers();
    }

    cargarForm() {
        this.form = this.fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
            enabled: [null, Validators.required],
            nombres: [null, Validators.required],
            apellidos: [null, Validators.required],
            email: [null, Validators.required],
            roles: [0, Validators.required]
        });
    }

    getUsers() {
        this.userService.getUsers().subscribe((res: any) => {
            this.listaUsers = res._embedded.usuarios;
            this.page = res.page;
        });
    }

    clickEdit(f: IUsers) {
        this.users = 'Editar';
        let id: number = f.id;
        this.userService.getUserId(id).subscribe((res: any) => {
            this.setDatos(f);
            this.id=f.id;
        });
    }
    setDatos(f) {
      //let pass = bcrypt.hashSync( this.form.controls.password.value.toString(),);
        this.form.controls.username.setValue(f.username);
        this.form.controls.password.setValue(f.password);
        this.form.controls.nombres.setValue(f.nombre);
        this.form.controls.apellidos.setValue(f.apellido);
        this.form.controls.email.setValue(f.email);
        this.form.controls.enabled.setValue(f.enabled);
    }

    clickDelete(f: IUsers) {
        const modalRef = this.serviceModal.open(ModalEliminarComponent);
        modalRef.componentInstance.user = f;
        modalRef.result.then((data) => {
            // on close
            this.getUsers();
            this.clickClear();
        });
    }

    onSubmit() {
        this.Validate = true;
        let rol: any = this.rol.filter(
            (x) => x.id == Number(this.form.controls.roles.value)
        );
        const salt = bcrypt.genSaltSync(10);
        let pass = bcrypt.hashSync(
            this.form.controls.password.value.toString(),
            salt
        );
        let user = {
            username: this.form.controls.username.value.toString(),
            password: pass,
            enabled: true,
            nombre: this.form.controls.nombres.value.toString(),
            apellido: this.form.controls.apellidos.value.toString(),
            email: this.form.controls.email.value.toString(),
            roles: [
                {
                    id: rol[0].id,
                    nombre: rol[0].nombre
                }
            ]
        };
        if (this.users === 'Crear') {
            this.userService.createUser(user).subscribe((res: any) => {
                this.getUsers();
                this.clickClear();
            });
        } else {
        
            this.userService.UpdateUser(user,this.id).subscribe((res: any) => {
                this.getUsers();
                this.clickClear();
            });
        }
    }

    clickClear() {
        this.form.reset();
        this.users = 'Crear';
    }

    invalidField(fiel: string) {
        if (this.Validate && this.form.controls[fiel].invalid) {
          return true;
        }else{
          return false;
        }
    }
}
