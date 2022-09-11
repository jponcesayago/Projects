import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {

  nombreParticipante: string = '';
  
  constructor(
    private router: Router,
    private respuestaCuestionario: RespuestaCuestionarioService
  ) { }

  ngOnInit(): void {
    
    console.log(this.nombreParticipante);
    /* if (this.respuestaCuestionario.nombreParticipante==null){
      this.router.navigate(['/inicio']);
    }  */
  }


  siguiente():void{
    this.respuestaCuestionario.nombreParticipante = this.nombreParticipante ;
    this.router.navigate(['/inicio/pregunta']);

  }
}
