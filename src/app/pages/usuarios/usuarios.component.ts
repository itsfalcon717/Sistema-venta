import { IResponseUser } from '@/interfaces/iresponseuser';
import { IUsers } from '@/interfaces/iusers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '@services/users.service';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';
import { Rol } from '@/utils/utils';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit  {
  listaUsers:IResponseUser[] = [];
  page:IResponseUser[] = [];
  users:string='Crear';
  rol = Rol;
  form:FormGroup;
  constructor(
    private userService: UsersService,
    public fb: FormBuilder,
    private serviceModal:NgbModal) { }
  
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
      email: [null],
      roles: [0]
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
    let id:number= f.id;
    this.userService.getUserId(id).subscribe((res:any) => {
      this.setDatos(f);
     });
  }
  setDatos(f){
    this.form.controls.username.setValue(f.username);
    this.form.controls.password.setValue(f.password);
    this.form.controls.nombres.setValue(f.nombre);
    this.form.controls.apellidos.setValue(f.apellido);
    this.form.controls.email.setValue(f.email);
    this.form.controls.enabled.setValue(f.enabled);
  }

  clickDelete(f:IUsers){
    const modalRef = this.serviceModal.open(ModalEliminarComponent);
    modalRef.componentInstance.user = f;
    modalRef.result.then((data) => {
      // on close
      this.getUsers();
      this.clickClear();
    });
  }

  onSubmit(){
    let rol:any=this.rol.filter(x => x.id == Number(this.form.controls.roles.value));
    let user = {
      username:this.form.controls.username.value.toString(),
      password:'$2a$10$GDVhOaII876ECHS5Ceo86OQe6xyUPqFckpgseN9y2m5YaTM0kBL4i',
      enabled:true,
      nombre:this.form.controls.nombres.value.toString(),
      apellido:this.form.controls.apellidos.value.toString(),
      email:this.form.controls.email.value.toString(),
      roles: [
        {
          id:rol[0].id,
          nombre: rol[0].nombre
       }
      ]
    }
    if(this.users==="Crear"){
    
      this.userService.createUser(user).subscribe((res:any) => {
        this.getUsers();
        this.clickClear();
       });
    }else{
     
      this.userService.UpdateUser(user).subscribe((res:any) => {
        this.getUsers();
        this.clickClear();
       });
    }

  }

  clickClear(){
    this.form.reset();
    this.users='Crear';
  }
}
