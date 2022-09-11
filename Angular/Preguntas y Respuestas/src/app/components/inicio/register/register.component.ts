import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from "./../../../models/usuario";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  loading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toast: ToastrService
  ) { 
    this.formGroup = this.formBuilder.group({
      usuario: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(4)]],
      confirmPassword: ['',Validators.required]
    },{
      validator : this.checkPassword
    })
  }

  ngOnInit(): void {
  }

  register(){
    /* console.log(this.formGroup);
 */
    this.loading = true;

    const data: Usuario ={
      nombreUsuario : this.formGroup.controls.usuario.value,
      password : this.formGroup.controls.password.value
    };
    //console.log(data);

    this.usuarioService.saveUser(data).subscribe(data =>{
      console.log(data);
      this.loading = false;
      this.toast.success(data.message,'Usuario registrado');
      this.router.navigate(['/inicio/login']);
      
    }, error=>{
      this.toast.error(error.error.message,'Error!')
      this.formGroup.reset();
      this.loading = false;
    });

    

  }

  checkPassword(formGroup: FormGroup): any{
    
    const pass = formGroup.controls.password.value;
    const confirmPass = formGroup.controls.confirmPassword.value;

    return pass===confirmPass ? null : { notSame: true};
  }

}
