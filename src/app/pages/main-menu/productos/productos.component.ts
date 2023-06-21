import { IProduct } from '@/interfaces/iproduct';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '@services/products.service';
import { DetailProductComponent } from './detail-product/detail-product.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  lista:IProduct[]=[];
  listaID:IProduct[]=[];
  constructor(private productService: ProductsService,private serviceModal:NgbModal) { }
  
  ngOnInit() {
    this.product();
  }

  product(){

    this.productService.product().subscribe((res:any) => {
     this.lista=res;
    });
  }

  clikInfo(form:IProduct){
    let id:number = Number(form.id);
      this.productService.productDetail(id).subscribe((res:any) => {
      this.listaID=res;
      const modalRef = this.serviceModal.open(DetailProductComponent);
      modalRef.componentInstance.user = form;
        // this.serviceModal.open(DetailProductComponent).result.then( r => {
        //   console.log("Tu respuesta ha sido: " + r);
        // }, error => { 
        //   console.log(error);
        // });

     });
 
  
  }
}
