import { IUsers } from '@/interfaces/iusers';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss']
})
export class ModalEliminarComponent implements OnInit {

  @Input() public user:IUsers;
  constructor(public activeModal: NgbActiveModal,private userService: UsersService,) { }
  ngOnInit(): void {
    console.log(this.user);
  }

  clickClose(){
    this.activeModal.close();
  }
  Save(){
 
    this.userService.deleteUser(this.user.id).subscribe((res:any) => {
      this.activeModal.close();
     });
  }

}
