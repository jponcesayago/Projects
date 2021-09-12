import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {



    private projectData$ = new BehaviorSubject({});
    projectDataSharedMessage = this.projectData$.asObservable();

    constructor() { }



    projectDataValuesChange(message: any) {
        this.projectData$.next(message)
    }

}
