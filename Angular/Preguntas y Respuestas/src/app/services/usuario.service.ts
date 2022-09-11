import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  appUrl:string;
  apiUrl:string;

  constructor(
    private http:HttpClient
  ) {
    this.appUrl = environment.endpoint;
    this.apiUrl = '/api/Usuarios';
   }

  saveUser(usuario: Usuario):Observable<any>{
    return this.http.post(this.appUrl + this.apiUrl, usuario);
  }


  changePassword(changePassword:any) :Observable<any>{
    return this.http.put(this.appUrl + this.apiUrl + '/CambiarPassword', changePassword);
  }
}
