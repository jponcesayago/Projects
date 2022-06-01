import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

    private productList$ = new BehaviorSubject([]);
    productListSharedMessage = this.productList$.asObservable();


    private producData$ = new BehaviorSubject({});
    productDataSharedMessage = this.producData$.asObservable();

    constructor() { }

    productListChange(message: any[]) {
        this.productList$.next(message)
    }

    productDetailValuesChange(message: any) {
        this.producData$.next(message)
    }

}
