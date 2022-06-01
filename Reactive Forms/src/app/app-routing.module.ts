import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { BasicFormComponent } from './basic-form/basic-form.component';

const routes: Routes = [

  {
    path: 'home',
    component: NavMenuComponent,
    children: [
      {
        path: 'basic-form',
        component : BasicFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
