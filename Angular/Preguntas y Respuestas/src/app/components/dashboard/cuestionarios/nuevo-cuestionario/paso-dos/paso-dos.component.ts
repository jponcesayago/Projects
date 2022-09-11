import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {

  tituloCuestionario: string;
  descripcionCuestionario: string;
  listPreguntas: Pregunta[] = [];

  loading: boolean = false;

  constructor(
    private cuestionarioService: CuestionarioService,
    private toast: ToastrService, private router: Router
  ) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;

    console.log(this.tituloCuestionario, this.descripcionCuestionario);
  }

  guardarPregunta(pregunta: Pregunta): void{

    this.listPreguntas.push(pregunta);
    console.log(this.listPreguntas);

  }

  eliminarPregunta(index){
    this.listPreguntas.splice(index,1);
    //console.log(this.listPreguntas, index)
  }


  guardarCuestionario(): void{

    this.loading = true;
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas,
      fechaCreacion: new Date()
    }
    console.log(cuestionario);

    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(
      data =>{
        console.log(data);
        this.toast.success('El cuestionario fue registrado con éxtio!','Cuestionario Registrado');
        this.router.navigate(['/dashboard']);
        this.loading = false;

      },error=>{
        this.toast.error('No se ha podido procesar la operación!','Error');
        this.router.navigate(['/dashboard']) ;
        this.loading = false;
      }
    )
  }
}
