import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = sessionStorage.getItem('token');
    if (token) {
      request = request.clone({
       setHeaders: {
         token: token
       },
     }
     );

    }else{
      request = request.clone({
        setHeaders: {
          'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'
        },
      });
    }
    console.log(request);


    return next.handle(request);


  }
}



