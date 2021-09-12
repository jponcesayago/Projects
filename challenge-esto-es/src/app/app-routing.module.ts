import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ProjectsListComponent } from './modules/projects-list/projects-list.component';
import { ProjectFormComponent } from './modules/project-form/project-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/nav-bar', pathMatch: 'full' },
  {
    path: 'nav-bar', component: NavBarComponent,
    data: { animation: 'userIndexPage' },
    children: [
      {
        path: 'projects-list',
        component: ProjectsListComponent,
        data: { animation: 'ProjectsListComponent' },
      },
      {
        path: 'project-form',
        component: ProjectFormComponent,
        data: { animation: 'ProjectFormComponent' },
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
