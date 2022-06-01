import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from '../../../services/products.service';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  products : Product [] = [];
  productId: string | null = null;

  limit = 10;
  offset = 0;

  ngOnInit(): void {
    this.productsService.getAll(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });

    this.route.queryParamMap.subscribe(params=>  {
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }


  loadMore(event:any) {
  
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    }); 
  }

}
