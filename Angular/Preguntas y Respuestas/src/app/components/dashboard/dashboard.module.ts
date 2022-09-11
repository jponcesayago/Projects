import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { CuestionarioComponent } from './cuestionarios/cuestionario/cuestionario.component';
import { NuevoCuestionarioComponent } from './cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { PasoUnoComponent } from './cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';
import { PasoDosComponent } from './cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
import { NuevaPreguntaComponent } from './cuestionarios/nuevo-cuestionario/paso-dos/nueva-pregunta/nueva-pregunta.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { EstadisticasComponent } from './cuestionarios/estadisticas/estadisticas.component';
import { DetalleRepuestaComponent } from './cuestionarios/estadisticas/detalle-repuesta/detalle-repuesta.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CambiarPasswordComponent,
    CuestionarioComponent,
    NuevoCuestionarioComponent,
    PasoUnoComponent,
    PasoDosComponent,
    NuevaPreguntaComponent,
    CuestionariosComponent,
    EstadisticasComponent,
    DetalleRepuestaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
