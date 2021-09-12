import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IDropDownItems } from 'src/app/interfaces/components/dropdown';
import { RouterOutlet, Router, Route, ActivatedRoute } from '@angular/router';
import { actions } from 'src/app/constants/crud.const';
import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  constructor(
    private projectFormBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.projectFormGroup = this.projectFormBuilder.group({
      'projectName': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'projectDescription': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'projectManager': new FormControl([Validators.required]),
      'assignedTo': new FormControl([Validators.required]),
      'status': new FormControl([Validators.required])
    });
  }

  //FormGroup

  projectFormGroup: FormGroup;

  //Inputs

  projectName: string = "";
  projectDescription: string = "";

  //Dropdowns

  projectManageOptions: IDropDownItems[] = [
    { id: 1, label: 'Walt Cosan', code: '' },
    { id: 2, label: 'Carlos Barrera', code: '' },
  ];
  selectedProjectManager: IDropDownItems = this.projectManageOptions[0];

  assignedToOptions: IDropDownItems[] = [
    { id: 1, label: 'Ignacio Truffa', code: '' },
    { id: 2, label: 'Juan Ponce', code: '' },
    { id: 3, label: 'Pablo Fernandez', code: '' },
    { id: 4, label: 'Gustavo Lopez', code: '' },
  ];
  selectedAssignedTo: IDropDownItems = this.assignedToOptions[0];

  statusOptions: IDropDownItems[] = [
    { id: 1, label: 'Enabled', code: 'enabled' },
    { id: 2, label: 'Disabled', code: 'disabled' },
  ];
  selectedStatus: IDropDownItems = this.statusOptions[0];

  //Button

  isConfirmButton: boolean = false;
  confirmButtonLabel: string = 'Create project';

  id: number = null;

  message: any;

  action: string = '';
  ngOnInit() {



    console.log(this.message);

    let action: string = '';
    let projectData: any = null;

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        projectData = params['projectData']
      });

    const projectDataJson: any = JSON.parse(projectData);


    action = projectDataJson.action;
    this.action = action;

    console.log(projectDataJson);

    switch (action) {
      case actions.ADD:
        this.confirmButtonLabel = 'Create project';
        this.isConfirmButton = true;
        break;
      case actions.EDIT:

        // const data: any = {
        //   isProjectFormView: false,
        //   navTitle: 'Edit project'
        // }
        // this.sharedService.projectDataValuesChange(data);

        this.confirmButtonLabel = 'Save changes';
        this.id = projectDataJson.data.id;
        this.projectName = projectDataJson.data.name;
        this.projectDescription = projectDataJson.data.description;
        break;
    }
  }

  HandleChangeElement() {

  }


  HandleValidateForm() {
    if ((this.projectName.replace(' ', '').length === 0) || (this.projectDescription.replace(' ', '').length === 0)) {
      this.isConfirmButton = true;
    } else {
      this.isConfirmButton = false;
    }

  }

  HandleConfirmButton() {


    const data: any = {
      action: this.action,
      isProjectFormView: false,
      navTitle: 'My projects',
      projectData: {
        id: this.id ? this.id : 0,
        name: this.projectName,
        description: this.projectDescription,
        pManager: this.selectedProjectManager.label,
        date: new Date(),
        assigned: this.selectedAssignedTo.label,
        status: this.selectedStatus.label
      }

    };

    console.log(data);

    this.sharedService.projectDataValuesChange(data);



    this.router.navigate(['/nav-bar/projects-list']);
  }

}
