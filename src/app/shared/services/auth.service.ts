import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment  } from 'src/environments/environment.development';
import { BehaviorSubject, tap, throwError } from 'rxjs';
import { Register } from '../models/register.model';
import { LogIn } from '../models/login.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url=environment.base_url;
  register_url=environment.register;
  logIn_url=environment.logIn;
  getUser_url=environment.get_user;
  changePassword_url=environment.change_password;
  add_address_url=environment.add_address;
  updateProfile_url=environment.update_profile;


  isLogin= new BehaviorSubject<boolean>(false);
  isLogin$=this.isLogin.asObservable();


  user=new BehaviorSubject<any>({});
  user$=this.user.asObservable();


  //constructor
  constructor(private http:HttpClient,   private toastr: ToastrService,private router:Router )  {

    if(sessionStorage.getItem('token')){
      this.isLogin.next(true);
      this.getUserDetails().subscribe();

    }







  }

  registration(data:Register){

    try {
      return this.http.post<Register>(this.base_url+this.register_url,data).pipe(
        tap(()=>{

          this.toastr.success('You have successfully signed up!', 'Sign-Up Successful');

        })
      );

    } catch (error:any) {
      return throwError(() => new Error(error));

    }


  }


  logIn(data:LogIn){

    try {
      return this.http.post<any>(this.base_url+this.logIn_url,data).pipe(
        tap(()=>{
          this.isLogin.next(true);
          console.log(this.isLogin.getValue());
          this.toastr.success('You have successfully logged in!');
        })
      );

    } catch (error:any) {
      return throwError(() => new Error(error));

    }


  }

  getUserDetails(){

    try {
      return this.http.get<any>(this.base_url+this.getUser_url).pipe(
        tap(
          (res)=>{
            this.user.next(res.data);
            console.log(res);

          }
        )
      );

    } catch (error:any) {
      return throwError(()=> new Error(error));

    }
  }


  //change password call api and data is oldPassword and newPassword
  changePassword(data:any){

    try {
      return this.http.put<any>(this.base_url+this.changePassword_url,data).pipe(
        tap(()=>{

          this.toastr.success('Your password has been changed successfully');

        })
      );

    } catch (error:any) {
      return throwError(()=> new Error(error));

    }
  }


//Add address
  addAddress(data:any){

    try {
      console.log(this.base_url+this.add_address_url);


      return this.http.post(this.base_url+this.add_address_url,data).pipe(
        tap(()=>{

          this.toastr.success('Your address has been added successfully');

        })
      );

    } catch (error:any) {
      return throwError (()=> new Error(error));
    }

  }



  //logout
  logOut(){
    if(sessionStorage.getItem('token'))

{
  console.log("logout");
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  this.isLogin.next(false);
  this.toastr.success('You have successfully logged out.', 'Logout Successful');
          console.log(this.isLogin.getValue());
          this.router.navigate(['']);
}
  }

updateProfile(data:any){

  try {

    return this.http.put(this.base_url+this.updateProfile_url,data);

  } catch (error:any) {

    return throwError(()=>new Error(error))


  }
}




}


