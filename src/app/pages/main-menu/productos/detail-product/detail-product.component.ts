import { IProduct } from '@/interfaces/iproduct';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  form:FormGroup 
  @Input() public user:any;

  constructor(public fb: FormBuilder,public activeModal: NgbActiveModal) { }
  
  ngOnInit() {
   console.log(this.user)
   this.cargarForm();
  }
  cargarForm(){
   this.form = this.fb.group({ 
      name: [this.user.nombre],
      precio: [this.user.precio],
      fecha: [this.user.createAt],
      puert: [this.user.port]
    })
  }
  clickClose(){
    this.activeModal.close();
  }
}
