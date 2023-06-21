import { IResponseUser } from '@/interfaces/iresponseuser';
import { IUsers } from '@/interfaces/iusers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit  {
  listaUsers:IResponseUser[] = [];
  page:IResponseUser[] = [];
  users:string='Crear';
  form:FormGroup;
  constructor(private userService: UsersService,public fb: FormBuilder) { }
  
  ngOnInit() {
    this.cargarForm();
    this.getUsers();
  }


  cargarForm(){
    this.form = this.fb.group({ 
      username: [null],
      password: [null],
      enabled: [null],
      nombres: [null],
      apellidos: [null],
      email: [null]
     })
   }

  getUsers(){

    this.userService.getUsers().subscribe((res:any) => {
     this.listaUsers=res._embedded.usuarios;
     this.page=res.page;
    });
  }

  clickEdit(f:IUsers){
    this.users='Editar';
    this.setDatos(f);
    // let id:number= f.id;
    // this.userService.getUserId(id).subscribe((res:any) => {
    //   this.listaUsers=res._embedded.usuarios;
    //   this.page=res.page;
    //  });
  }
  setDatos(f){
    this.form.controls.username.setValue(f.username);
    this.form.controls.password.setValue(f.password);
    this.form.controls.nombres.setValue(f.nombres);
    this.form.controls.apellidos.setValue(f.apellidos);
    this.form.controls.email.setValue(f.email);
    this.form.controls.enabled.setValue(f.enabled);
  }
}
