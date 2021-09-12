import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { RouterOutlet, Router } from '@angular/router';

//Interfaces
import { IDropDownItems } from '../../interfaces/components/dropdown';
import { actions } from 'src/app/constants/crud.const';

import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
  providers: [
    ConfirmationService, MessageService
  ]
})
export class ProjectsListComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private router: Router, public sharedService: SharedService,
  ) {

  }

  //Dataview
  projectsValues: any[] = [
    { id: 1, name: 'Landing Page', description: 'initial app page', pManager: 'Walt Cosani', date: '2020-09-09T10:30:00', assigned: 'Ignacio Truffa', status: 'enabled' },
    { id: 2, name: 'E-Commerce Shop', description: '', pManager: 'Walt Cosani', date: '2020-09-09T10:30:00', assigned: 'Ignacio Truffa', status: 'enabled' },
    { id: 3, name: 'CRM Linkroom', description: 'initial app page', pManager: 'Walt Cosani', date: '2020-09-09T10:30:00', assigned: 'Ignacio Truffa', status: 'enabled' }

  ];

  //Toast
  toastZIndex: number = 10000;

  //items

  items: MenuItem[];

  selectedProject: any = null;

  message: any = {};

  ngOnInit() {

    this.sharedService.projectDataSharedMessage.subscribe(message => {

      this.message = message;

      if (this.message.action !== undefined) {


        if (this.message.action === actions.ADD) {

          this.message.id = new Date().getTime();
          this.projectsValues = [...this.projectsValues, this.message.projectData];
        }
        if (this.message.action === actions.EDIT) {

          console.log(message);
          const index: number = this.projectsValues.findIndex(item => item.id === this.message.projectData.id);
          this.projectsValues[index] = {
            name: this.message.projectData.name,
            description: this.message.projectData.description,
            pManager: this.message.projectData.pManager,
            date: this.message.projectData.date,
            assigned: this.message.projectData.assigned,
            status: this.message.projectData.status

          }
        }


      }

    });

    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
          this.HandleEditItem();
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.HandleDeleteItem();
        }
      }
    ];

  }


  openCm(event, cm, project) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedProject = project;
    //console.log(project);
    //this.prepCm();
    cm.show(event);
    return false;
  }


  //////////////////////////////////////////////////

  HandleDeleteItem() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const itemIndex: number = this.projectsValues.findIndex(item => item.id === this.selectedProject.id)

        this.projectsValues.splice(itemIndex, 1);
        this.projectsValues = [...this.projectsValues];
        this.messageService.add({ key: 'operationStatusInfo', severity: 'success', summary: 'Confirmed', detail: 'Item has been deleted succesfully!' });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ key: 'operationStatusInfo', severity: 'error', summary: 'Rejected', detail: 'You have rejected' });

            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ key: 'operationStatusInfo', severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  HandleEditItem() {


    const data: any = {
      isProjectFormView: true,
      navTitle: 'Edit project'
    }
    this.sharedService.projectDataValuesChange(data);

    const projectData: any = {
      action: actions.EDIT,
      data: this.selectedProject
    }



    const projectDataString: string = JSON.stringify(projectData);
    this.router.navigate(['/nav-bar/project-form'], { queryParams: { projectData: projectDataString } })
  }

}
