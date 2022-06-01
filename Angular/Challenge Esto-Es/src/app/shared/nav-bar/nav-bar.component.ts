import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from '../../animations';

import { actions } from "../../constants/crud.const";

import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  animations: [slideInAnimation],
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    public sharedService: SharedService,
  ) {

  }


  isProjectFormView: boolean = false;
  navTitle: string = 'My projects';

  message: any = {};

  ngOnInit() {

    this.sharedService.projectDataSharedMessage.subscribe(message => {
      this.message = message
      if (this.message.navTitle !== undefined) {

        console.log(message);
        this.navTitle = this.message.navTitle;
        this.isProjectFormView = this.message.isProjectFormView;
      }

    });

    this.router.navigate(['/nav-bar/projects-list']);

  }

  ////////////////////////////////////////////////////

  getAnimationData(outlet: RouterOutlet) {
    //console.log("animation");
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  //////////////////////////////////////////////////////////////////////////7


  HandleAddButton() {

    this.isProjectFormView = true;
    this.navTitle = 'Add project';

    const projectData: any = {
      action: actions.ADD,
      data: null
    }

    const projectDataString: string = JSON.stringify(projectData);

    this.router.navigate(['/nav-bar/project-form'], { queryParams: { projectData: projectDataString } });
  }


  ////////////////////////////////////////////////////////////////////////////

  HandleBackButton() {
    this.isProjectFormView = false;
    this.navTitle = 'My projects'
    this.router.navigate(['/nav-bar/projects-list']);

  }
}
