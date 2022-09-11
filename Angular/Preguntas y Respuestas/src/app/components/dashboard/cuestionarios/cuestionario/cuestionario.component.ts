import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  idCuestionario: number;
  loading : boolean = false;
  cuestionario : any ;
  constructor(
    private cuestionarioService: CuestionarioService, private route : ActivatedRoute
  ) 
  {
    this.idCuestionario = +this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.loading = true;
    this.getCuestionario();
  }

  getCuestionario(): void{
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(
      data =>{
        this.loading = false;
        console.log(data);
        this.cuestionario = data;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    )
  }


}
