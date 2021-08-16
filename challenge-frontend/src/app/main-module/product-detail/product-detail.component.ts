import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
  ) { }


  //Product

  productData: any = null;

  ngOnInit() {

    this.sharedService.productDataSharedMessage.subscribe(message => this.productData = message);
  }


}
