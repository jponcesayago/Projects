import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './animations';
import { RouterOutlet, Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  title = 'Challenge-Frontend-Developer';

  ngOnInit() {
    ////////////////////////////
    //Session && Local Storage

    sessionStorage.setItem('url', environment.MLIBREAPIURL);
    sessionStorage.setItem('token', '1234567');

    this.primengConfig.ripple = true;
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
