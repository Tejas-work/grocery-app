import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment  } from 'src/environments/environment.development';
import { throwError } from 'rxjs';
import { Register } from '../models/register.model';
import { LogIn } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url=environment.base_url;
  register_url=environment.register;
  logIn_url=environment.logIn

  constructor(private http:HttpClient )  {

  }

  registration(data:Register){

    try {
      return this.http.post<Register>(this.base_url+this.register_url,data);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }


  }


  logIn(data:LogIn){

    try {
      return this.http.post<LogIn>(this.base_url+this.logIn_url,data);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }


  }
}
