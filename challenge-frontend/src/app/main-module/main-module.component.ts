import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from '../animations';
import { ProductListComponent } from './product-list/product-list.component'

//Services
import { HttpService } from '../services/http-service';
import { SharedService } from '../services/shared-service';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
import { Observable, of, scheduled, Subscription } from 'rxjs';

registerLocaleData(localeEs, 'es-AR');

@Component({
  selector: 'app-main-module',
  templateUrl: './main-module.component.html',
  styleUrls: ['./main-module.component.css'],
  animations: [slideInAnimation],
  encapsulation: ViewEncapsulation.None,
  providers: [HttpService, ProductListComponent]
})
export class MainModuleComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef;

  constructor(
    private httpService: HttpService, private router: Router,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {
    this.FormGroup = this.formBuilder.group({
      'search': ['']
    }, { validator: null });

    this.FormGroup.setValue(
      {
        'search': ''
      }
    );




  }


  ngAfterViewInit() {

    this.searchInput.nativeElement.focus();


  }

  //FormGroup

  FormGroup: FormGroup;

  //BreadCrumb
  items: MenuItem[];

  home: MenuItem;

  //DataView
  dataViewValues: any[] = [];
  emptyMessage: string = "No Hay Resultados Para la Búsqueda"

  ngOnInit() {


    this.items = [];

    this.home = { icon: 'pi pi-home', routerLink: '/' };



  }

  ////////////////////////////////////////////////////

  getAnimationData(outlet: RouterOutlet) {
    //console.log("animation");
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  //////////////////////////////////////////////////////////////////////////7


  async getSearch() {

    const { search } = this.FormGroup.value;


    await this.httpService.getSearch(search).then(
      (data) => {
        console.log(data);

        if ((data !== null) && (data !== undefined)) {

          this.dataViewValues = data.results.map((item, i) => {

            let condition = "";
            if (item.condition === 'new') {
              condition = 'Nuevo';
            } else {
              condition = 'Usado';
            }
            return ({
              id: item.id,
              price: item.price,
              thumbnail: item.thumbnail,
              title: item.title,
              state_name: item.address.state_name,
              free_shipping: item.shipping.free_shipping,
              sold_quantity: item.sold_quantity,
              condition: condition
            })
          });


          const categoryFilterIndex: number = data.filters.findIndex(item => {
            return item.id === 'category';
          });

          //console.log(this.dataViewValues);

          if (categoryFilterIndex >= 0) {
            this.items = data.filters[categoryFilterIndex].values[0].path_from_root.map((item, i) => {
              return ({
                id: item.id,
                label: item.name,
                command: () => {
                  this.getSearchByCategory(item.name);
                }
              })
            });
          }

          //console.log(this.items);

        }

      }
    );

    this.sharedService.productListChange(this.dataViewValues);
    this.router.navigate(['/main-module/product-list']);
    this.FormGroup.reset();
  }

  async getSearchByCategory(searchCategory) {


    await this.httpService.getSearch(searchCategory).then(
      (data) => {
        //console.log(data);

        if ((data !== null) && (data !== undefined)) {

          this.dataViewValues = data.results.map((item, i) => {

            let condition = "";
            if (item.condition === 'new') {
              condition = 'Nuevo';
            } else {
              condition = 'Usado';
            }
            return ({
              id: item.id,
              price: item.price,
              thumbnail: item.thumbnail,
              title: item.title,
              state_name: item.address.state_name,
              free_shipping: item.shipping.free_shipping,
              sold_quantity: item.sold_quantity,
              condition: condition
            })
          });



          const itemIndex: number = this.items.findIndex(item => {

            return item.label === searchCategory;
          });

          if (itemIndex >= 0) {
            const deleteCount: number = this.items.length - itemIndex - 1;
            console.log(deleteCount);
            this.items.splice(itemIndex + 1, deleteCount);
            this.items = [...this.items];
          }


          //console.log(this.items);

        }

      }
    );

    this.sharedService.productListChange(this.dataViewValues);
    this.router.navigate(['/main-module/product-list']);

  }


  //////////////////////////////////////////////////



}
