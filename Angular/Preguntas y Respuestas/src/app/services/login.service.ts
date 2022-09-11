import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  appUrl:string;
  apiUrl:string;

  constructor(
    private http:HttpClient
  ) 
  { 
    this.appUrl = environment.endpoint;
    this.apiUrl = '/api/Login';
  }

  validateUser(usuario:Usuario):Observable<any>{
    return this.http.post(this.appUrl + this.apiUrl, usuario);
  }

  setLocalStorage(data):void{
    sessionStorage.setItem('token',data);
  }

/*   getLocalStorage():void{
    sessionStorage.getItem('nombreUsuario');
  } */

  removeLocalStorage():void{
    sessionStorage.removeItem('token');
  }

  getTokenDecoded(): any {
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(sessionStorage.getItem('token'));
    /* const expirationDate = helper.getTokenExpirationDate(myRawToken);
    const isExpired = helper.isTokenExpired(myRawToken); */
    return decodedToken;
  }

  getToken():string{
    return sessionStorage.getItem('token');
  }
}
