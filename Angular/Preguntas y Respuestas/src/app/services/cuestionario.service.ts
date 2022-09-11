import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Cuestionario } from "../models/cuestionario";

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  tituloCuestionario: string;
  descripcionCuestionario: string;
  appUrl:string;
  apiUrl:string;

  constructor(
    private http: HttpClient
  ) 
  { 
    this.appUrl = environment.endpoint;
    this.apiUrl = '/api/Cuestionario';
  }


  guardarCuestionario(cuestionario: Cuestionario):Observable<any>{
    //console.log(this.appUrl + this.apiUrl);
    return this.http.post(this.appUrl + this.apiUrl, cuestionario);
  }

  getListCuestionarioByUser():Observable<any>{
    return this.http.get(this.appUrl + this.apiUrl + '/GetListCuestionariosByUser')
  }

  deleteCuestionario(idCuestionario: number):Observable<any>{
    return this.http.delete(this.appUrl + this.apiUrl + '/' + idCuestionario)
  }

  getCuestionario(idCuestionario: number):Observable<any>{
    return this.http.get(this.appUrl + this.apiUrl + '/' + idCuestionario)
  }

  getListCuestionarios():Observable<any>{
    return this.http.get(this.appUrl + this.apiUrl + '/GetListCuestionarios')
  }

}
