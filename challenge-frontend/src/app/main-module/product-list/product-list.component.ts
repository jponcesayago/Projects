import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';

//Services
import { HttpService } from '../../services/http-service';
import { SharedService } from '../../services/shared-service';
import { Observable, of, ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [HttpService]
})
export class ProductListComponent implements OnInit {

  constructor(
    private httpService: HttpService, private router: Router,
    public sharedService: SharedService,
  ) {

  }


  //BreadCrumb
  items: MenuItem[];

  home: MenuItem;

  //DataView
  dataViewValues: any[] = [];
  emptyMessage: string = "No Hay Resultados Para la Búsqueda"


  ngOnInit() {

    this.sharedService.productListSharedMessage.subscribe(message => this.dataViewValues = message);

  }

  ////////////////////////////////////////////////////////



  navProductDetail(product: any) {

    //console.log(product);

    this.sharedService.productDetailValuesChange(product);
    this.router.navigate(['/main-module/product-detail']);

  }
}
