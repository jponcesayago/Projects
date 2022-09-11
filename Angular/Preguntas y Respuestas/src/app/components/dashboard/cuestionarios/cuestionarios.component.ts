import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {

  nombreUsuario: string = '';
  tokenInfo: any;
  listCuestionario: Cuestionario[] = [];
  loading: boolean = false;

  constructor(
    private loginService : LoginService,
    private cuestionarioService: CuestionarioService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.tokenInfo = this.loginService.getTokenDecoded();
    console.log(this.tokenInfo);

    this.nombreUsuario = this.tokenInfo.sub;


    this.loading = true;
    this.getCuestionario();
  }


  getCuestionario(): void{
    this.cuestionarioService.getListCuestionarioByUser().subscribe(
      data =>{
        this.loading = false;
        console.log(data);
        this.listCuestionario = data;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    )
  }

  deleteCuestionario(id:number): void{
    if (confirm('Esta seguro que desea ELIMINAR el cuestionario?')){
      this.cuestionarioService.deleteCuestionario(id).subscribe(
        data =>{
          this.toast.success('El cuestionario fue eliminado con exito!', 'Registro eliminado');
          this.loading = true;
          this.getCuestionario();
        }
      );
    }
  }

}
