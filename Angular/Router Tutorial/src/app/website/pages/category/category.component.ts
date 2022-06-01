import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../../services/products.service";
import { switchMap } from "rxjs/operators";

import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;

  products: Product[] = [];

  constructor(
    private route:ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params=> {
        this.categoryId = params.get('id');
        if (this.categoryId)
        {
          return this.productService.getProductsByCategory(this.categoryId,this.limit, this.offset);
        }
        return [];
        
      }))
    .subscribe(
      data=>{
        this.products = data;
      });

  }

}
