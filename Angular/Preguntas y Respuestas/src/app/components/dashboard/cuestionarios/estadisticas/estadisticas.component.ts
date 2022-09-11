import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  idCuestionario: number;
  loading: boolean = false;
  listRespuestaCuestionarios: RespuestaCuestionario [] = [];

  constructor(
    private route: ActivatedRoute,
    private respCuestioServ: RespuestaCuestionarioService,
    private toast: ToastrService
  ) 
  {
    this.idCuestionario = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loading = true;
    this.getListCuestionarioRespuesta();
  }

  getListCuestionarioRespuesta(){
    this.respCuestioServ.getListCuestionarioRespuesta(this.idCuestionario).subscribe(
      data =>{
        this.loading = false;
        console.log(data);
        this.listRespuestaCuestionarios = data;
      },
    )
  }

  eliminarRespuestaCuestionario(idRespuestaCuestionario: number): void{
    this.loading = true;
    this.respCuestioServ.eliminarRespuestaCuestionario(idRespuestaCuestionario).subscribe(
      data =>{
        this.loading = false;
        console.log(data);
        //this.listRespuestaCuestionarios = data;
        this.toast.error('La respuesta se ha eliminado con éxito!','Registro eliminado');
        this.getListCuestionarioRespuesta();
      },
    )
  }

}
