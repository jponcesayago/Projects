import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Módulos

//import { ReactiveFormsModule } from "@angular/forms";
//import { FormsModule } from "@angular/forms"
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

//Services

//import { UsuarioService } from "./services/usuario.service";

//Components

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
//import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
//import { LoadingComponent } from './shared/loading/loading.component';
import { TokenInterceptor } from './helpers/token.interceptor';
//import { NuevoCuestionarioComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
//import { PasoUnoComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';
//import { PasoDosComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
//import { NuevaPreguntaComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-dos/nueva-pregunta/nueva-pregunta.component';
//import { CuestionarioComponent } from './components/dashboard/cuestionarios/cuestionario/cuestionario.component';
import { ListCuestionariosComponent } from './components/inicio/list-cuestionarios/list-cuestionarios.component';
//import { IngresarNombreComponent } from './components/inicio/list-cuestionarios/ingresar-nombre/ingresar-nombre.component';
//import { PreguntaComponent } from './components/inicio/list-cuestionarios/pregunta/pregunta.component';
//import { RespuestaCuestionarioComponent } from './components/inicio/list-cuestionarios/respuesta-cuestionario/respuesta-cuestionario.component';
//import { EstadisticasComponent } from './components/dashboard/cuestionarios/estadisticas/estadisticas.component';
//import { DetalleRepuestaComponent } from './components/dashboard/cuestionarios/estadisticas/detalle-repuesta/detalle-repuesta.component';

import { SharedModule } from './shared/shared.module';
import { ListCuestionariosModule } from './components/inicio/list-cuestionarios/list-cuestionarios.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BienvenidaComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    //CuestionariosComponent,
    //CambiarPasswordComponent,
    NavbarComponent,
    //LoadingComponent,
    //NuevoCuestionarioComponent,
    //PasoUnoComponent,
    //PasoDosComponent,
    //NuevaPreguntaComponent,
    //CuestionarioComponent,
    ListCuestionariosComponent,
    //IngresarNombreComponent,
    //PreguntaComponent,
    //RespuestaCuestionarioComponent,
    //EstadisticasComponent,
    //DetalleRepuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    SharedModule,
    ListCuestionariosModule,
    DashboardModule
    //FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
