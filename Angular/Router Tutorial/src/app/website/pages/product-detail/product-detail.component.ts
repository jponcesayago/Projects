import { Component, OnInit } from '@angular/core';
import { Location  } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';
import { ProductsService } from "../../../services/products.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  productId : string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService : ProductsService,
    private router : Router, private location: Location
  ) { }

  ngOnInit(): void {

    this.route.paramMap
    .pipe(
      switchMap(params=> {
        this.productId = params.get('id');
        if (this.productId)
        {
          return this.productService.getOne(this.productId);
        }
        return [];
        
      }))
    .subscribe(
      data=>{
        this.product = data;
      });
  }

  goBack(){
    this.location.back();
  }
}
