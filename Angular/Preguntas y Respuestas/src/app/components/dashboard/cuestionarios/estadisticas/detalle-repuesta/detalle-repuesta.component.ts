import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-detalle-repuesta',
  templateUrl: './detalle-repuesta.component.html',
  styleUrls: ['./detalle-repuesta.component.css']
})
export class DetalleRepuestaComponent implements OnInit {

  idRespuesta: number;
  loading: boolean = false;
  cuestionario : Cuestionario;
  respuestas: RespuestaCuestionarioDetalle [] = [];



  constructor(
    private route: ActivatedRoute, private respCuestServ: RespuestaCuestionarioService
  ) 
  {
    this.idRespuesta = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loading = true;
    this.getListRespuestasYCuestionario();
  } 

  getListRespuestasYCuestionario():void{
    this.respCuestServ.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(
      data =>{
        this.loading = false;
        console.log(data);
        this.cuestionario = data.cuestionario;
        this.respuestas = data.respuestas;
      },
    )
  }

}
