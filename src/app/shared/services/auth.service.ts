import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  logIn_url=environment.logIn;
  getUser_url=environment.get_user;
  changePassword_url=environment.change_password;

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
      return this.http.post<any>(this.base_url+this.logIn_url,data);

    } catch (error:any) {
      return throwError(() => new Error(error));

    }


  }

  getUserDetails(){

    try {
      return this.http.get<any>("https://e099-117-217-127-105.in.ngrok.io/api/v1/customer/customer-details");

    } catch (error:any) {
      return throwError(()=> new Error(error));

    }
  }


  //change password call api and data is oldPassword and newPassword
  changePassword(data:any){

    try {
      return this.http.put<any>(this.base_url+this.changePassword_url,data);

    } catch (error:any) {
      return throwError(()=> new Error(error));

    }
  }
}
