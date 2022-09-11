import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Usuario } from "./../../../models/usuario";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Element } from '@angular/compiler';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('userInput') userInput : ElementRef;


  formGroup: FormGroup;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router, private loginService: LoginService
  ) { 
    this.formGroup = this.formBuilder.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  log(){
    console.log(this.formGroup);

    const usuario: Usuario ={
      nombreUsuario : this.formGroup.value.usuario,
      password: this.formGroup.value.password
    };
    this.loading = true;

    this.loginService.validateUser(usuario).subscribe(
      data =>{
        console.log(data);
        this.loading = false;
        //this.toastrService.success(data.message,'Usuario registrado');
        this.loginService.setLocalStorage(data.token);
        this.router.navigate(['/dashboard'])
        
      }, error=>{
        this.toastrService.error(error.error.message,'Error!')
        this.formGroup.reset();
        this.userInput.nativeElement.focus();
        this.loading = false;
      }
    )
  /*   setTimeout(() => {
      if (usuario.nombreUsuario === 'juan' && usuario.password === '123'){
        this.formGroup.reset();
        this.router.navigate(['/dashboard'])
      }else{
        this.formGroup.reset();
        this.toastrService.error('Usuario o contraseña incorrectos!','Error');
        this.userInput.nativeElement.focus();
      }
      this.loading = false;
    }, 3000); */

    
  }
}
