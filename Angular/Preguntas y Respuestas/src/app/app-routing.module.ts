import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { PasoDosComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { CuestionarioComponent } from './components/dashboard/cuestionarios/cuestionario/cuestionario.component';
import { ListCuestionariosComponent } from './components/inicio/list-cuestionarios/list-cuestionarios.component';
import { IngresarNombreComponent } from './components/inicio/list-cuestionarios/ingresar-nombre/ingresar-nombre.component';
import { PreguntaComponent } from './components/inicio/list-cuestionarios/pregunta/pregunta.component';
import { RespuestaCuestionarioComponent } from './components/inicio/list-cuestionarios/respuesta-cuestionario/respuesta-cuestionario.component';
import { EstadisticasComponent } from './components/dashboard/cuestionarios/estadisticas/estadisticas.component';
import { DetalleRepuestaComponent } from './components/dashboard/cuestionarios/estadisticas/detalle-repuesta/detalle-repuesta.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo:'/inicio'},
  {path:'inicio', component:InicioComponent, children:[
    {path:'', component:BienvenidaComponent},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'list-cuestionarios', component: ListCuestionariosComponent},
    {path:'ingresar-nombre', component: IngresarNombreComponent},
    {path:'pregunta', component: PreguntaComponent},
    {path:'resp-cuestionario', component: RespuestaCuestionarioComponent}
  ]},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard], children:[
    {path:'', component:CuestionariosComponent},
    {path:'ver-cuestionario/:id', component:CuestionarioComponent},
    { path: 'estadisticas/:id', component: EstadisticasComponent},
    { path: 'detalle-respuesta/:id', component: DetalleRepuestaComponent},
    {path:'cambiarPassword', component: CambiarPasswordComponent},
    {path:'nuevoCuestionario', component: NuevoCuestionarioComponent , children:[
      {path:'pasoUno', component: PasoUnoComponent},
      {path:'pasoDos', component: PasoDosComponent}
    ]},
   
  ]
  },
  { path:'**',redirectTo: '/bienvenidos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
