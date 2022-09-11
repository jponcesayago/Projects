import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor
  (
    private router : Router, private toast: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');

    if (token){
      request = request.clone({setHeaders:{Authorization: `Bearer ${token}` }});

    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401){
          this.toast.error('Sesion expirada','Error!');
          this.router.navigate(['/inicio/login']);
        }
        return throwError(error);
      })
    );
  }
}
