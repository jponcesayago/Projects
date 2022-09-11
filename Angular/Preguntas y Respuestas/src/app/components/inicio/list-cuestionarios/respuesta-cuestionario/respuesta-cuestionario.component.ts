import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-respuesta-cuestionario',
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrls: ['./respuesta-cuestionario.component.css']
})
export class RespuestaCuestionarioComponent implements OnInit {

  cuestionario: Cuestionario;
  respuestaUsuario: number[] = [];

  constructor(
    private respuestaCuestionarioServ: RespuestaCuestionarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.respuestaCuestionarioServ.idCuestionario == null){
      this.router.navigate(['/inicio']);
    }else{
      this.cuestionario = this.respuestaCuestionarioServ.cuestionario;
      this.respuestaUsuario = this.respuestaCuestionarioServ.respuestas;
      console.log(this.respuestaCuestionarioServ.respuestas);
    }
  }

  volver():void{
    this.respuestaCuestionarioServ.respuestas = [];
    this.respuestaCuestionarioServ.cuestionario = null;
  }

}
