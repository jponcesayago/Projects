import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  listPreguntas: Pregunta [] = [];
  idCuestionario: number ;
  loading: boolean = false;
  rtaConfirmada: boolean = false;
  opcionSeleccionada: any;
  index: number = 0;
  idRespuestaSeleccionada: number;

  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];

  constructor(
    private respCuestionarioServ: RespuestaCuestionarioService,
    private cuestionarioServ: CuestionarioService, private router: Router
  ) { }

  ngOnInit(): void {
    this.idCuestionario = this.respCuestionarioServ.idCuestionario;
    if ((this.idCuestionario===null)||(this.idCuestionario===undefined)){
      this.router.navigate(['/inicio'])
    }
    this.loading = true;
    this.getCuestionario();
    console.log(this.respCuestionarioServ.idCuestionario);
  }

  getCuestionario():void{
    this.cuestionarioServ.getCuestionario(this.idCuestionario).subscribe(
      data =>{
        console.log(data);
        this.listPreguntas = data.listPreguntas;
        this.loading = false;
        this.respCuestionarioServ.cuestionario = data;
      }
    );
    
  }

  obtenerPregunta():string{
    return this.listPreguntas[this.index].descripcion;
  }

  getIndex(): number{
    return this.index;
  }

  respuestaSeleccionada(respuesta: any,idRespuesta:number):void{
    this.idRespuestaSeleccionada = idRespuesta;
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;

  }

  AddClassOption(respuesta: any): string{
    if (this.opcionSeleccionada === respuesta){
      return 'active text-light';
    }
  }

  siguiente():void{
    this.respCuestionarioServ.respuestas.push(this.idRespuestaSeleccionada);
    console.log(this.respCuestionarioServ.respuestas);

    const detalleRespuesta: RespuestaCuestionarioDetalle = {
      respuestaId : this.idRespuestaSeleccionada
    };

    this.listRespuestaDetalle.push(detalleRespuesta);


    this.rtaConfirmada = false;
    this.index++;

    if (this.index === this.listPreguntas.length){
      //this.router.navigate(['/inicio/resp-cuestionario']);
      this.guardarRespuestaCuestionario();
    }
  }


  guardarRespuestaCuestionario(){
    const rtaCuesionario: RespuestaCuestionario = {
      cuestionarioId : this.respCuestionarioServ.idCuestionario,
      nombreParticipante: this.respCuestionarioServ.nombreParticipante,
      listRtaCuestionarioDetalle: this.listRespuestaDetalle
    }
    this.loading = true;
    this.respCuestionarioServ.guardarRespuestaCuestionario(rtaCuesionario).subscribe(
      data =>{
        this.router.navigate(['/inicio/resp-cuestionario']);
        this.loading = false;
      }, error =>{
        this.loading = false;
        console.log(error);
      }
    )
  }
}
