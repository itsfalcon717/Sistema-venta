import { IProduct } from '@/interfaces/iproduct';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  lista:IProduct[]=[];
  constructor(private productService: ProductsService) { }
  
  ngOnInit() {
    this.product();
  }

  product(){

    this.productService.product().subscribe((res:any) => {
     this.lista=res;
    });
  }

  clikInfo(form:IProduct){
  
  }
}
