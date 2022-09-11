import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { FormArray } from '@angular/forms';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {

  formGroup: FormGroup;
  pregunta: Pregunta;
  rtaCorrecta: number = 0;

  @Output() enviarPregunta = new EventEmitter();

  constructor(
    private fb: FormBuilder, private toast: ToastrService
  ) {
    this.formGroup = this.fb.group({
      titulo: ['',Validators.required],
      respuestas: this.fb.array([
        /* {
          descripcion: ['',Validators.required],
          esCorrecta: 0
        } */
      ])
    })
   }

  ngOnInit(): void {
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  get getRespuestas() : FormArray{
    return this.formGroup.get('respuestas') as FormArray;
  }

  agregarRespuesta(): void {
    this.getRespuestas.push(this.fb.group({
      descripcion: ['',Validators.required],
      esCorrecta: 0
    }));
  }


  eliminarRespuesta(index: number): void{
    if (this.getRespuestas.length==2){
      this.toast.error('Debe haber 2 respuestas como mínimo!','Error')
    }else {
      this.getRespuestas.removeAt(index);
    }
  }

  setRespuestaValida(index: number): void{
    this.rtaCorrecta = index;

  }

  agregarPregunta(): void{

    const descripcion = this.formGroup.get('titulo').value;
    const arrayRespuestas = this.getRespuestas.value;

    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((element, index) => {
      const respuesta: Respuesta  = new Respuesta(element.descripcion, false);
      
      if (index === this.rtaCorrecta){
        respuesta.esCorrecta = true;
      }
      arrayRta.push(respuesta);


    });

    const pregunta : Pregunta = new Pregunta(descripcion,arrayRta);

    this.enviarPregunta.emit(pregunta);
    
    console.log(pregunta);
    this.reset();

  }

  reset(){
    this.rtaCorrecta = 0;
    this.formGroup.reset();
    this.getRespuestas.clear();

    this.agregarRespuesta();
    this.agregarRespuesta();
  }
}
