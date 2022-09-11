import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  formGroup: FormGroup;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toast : ToastrService,
    private router: Router
  ) {

    this.formGroup = this.formBuilder.group({
      passAnterior: ['',Validators.required],
      nuevoPass: ['',[Validators.required, Validators.minLength(4)]],
      confirmPass:['']
    },{
      validator : this.checkPassword
    })

   }

  ngOnInit(): void {
  }


  checkPassword(formGroup: FormGroup): any{
    const pass = formGroup.controls.nuevoPass.value;
    const confirmPass = formGroup.controls.confirmPass.value;

    return pass===confirmPass ? null : { notSame: true};
  }

  guardarPassword():void{
    const changePassword: any = {
      passwordAnterior: this.formGroup.controls.passAnterior.value ,
      nuevaPassword: this.formGroup.controls.nuevoPass.value
    };
    this.loading = true;

    this.usuarioService.changePassword(changePassword).subscribe(data =>{
      this.toast.success(data.message,'Operacion Exitosa!');
      this.router.navigate(['/inicio/login']);
      this.loading = false;
    },error=>{
      this.toast.error(error.error.message,'Error!')
      this.formGroup.reset();
      this.loading = false;
    })
  }

}
