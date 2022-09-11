import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit {

  loading : boolean = false;
  listCuestionarios: any [] = [];
  constructor(
    private cuestionarioService : CuestionarioService,
    private router: Router, private respCuestionarioServ: RespuestaCuestionarioService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getListCuestionarios();
  }

  getListCuestionarios(): void {
    this.cuestionarioService.getListCuestionarios().subscribe(
      data =>{
        this.loading = false;
        console.log(data);
        this.listCuestionarios = data;
      },
    )
  }


  ingresarNombre(idCuestionario: number): void{

    this.respCuestionarioServ.idCuestionario = idCuestionario;
    this.router.navigate(['/inicio/ingresar-nombre']);
  }

}
