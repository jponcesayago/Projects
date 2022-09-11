import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css']
})
export class PasoUnoComponent implements OnInit {

  formGroup: FormGroup;
  constructor(
    private  fromBuilder: FormBuilder,
    private router : Router,
    private cuestionarioService: CuestionarioService
  ) 
  { 
    this.formGroup = this.fromBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  pasoUno(): void{
    this.cuestionarioService.tituloCuestionario = this.formGroup.controls.titulo.value;
    this.cuestionarioService.descripcionCuestionario = this.formGroup.controls.descripcion.value;
    this.router.navigate(['dashboard/nuevoCuestionario/pasoDos'])
  }

}
