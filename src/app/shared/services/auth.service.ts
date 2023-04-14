import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, catchError, of, take, tap, throwError } from 'rxjs';
import { Register, RegisterResponse } from '../models/register.model';
import { LogIn, LoginResponse } from '../models/login.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { EncryptApiResponse } from '../models/encrypt.model';

import { LocalCartService } from './local-cart.service';
import { CustomerDetailsResponse } from '../models/customerDetails.model';
import { ChangePasswordRequest, ChangePasswordResponse } from '../models/changePassword.model';
import { UserUpdate, UserUpdateResponse } from '../models/userUpdate.model';
import { AddAddress, AddAddressResponse, AddressDeleteResponse, AddressUpdateRequest, AddressUpdateResponse } from '../models/Address.model';
import { ApiOrder, Customer, OrderApiResponse, getOrders } from '../models/order.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url = environment.base_url;
  headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'skip-browser-warning',
    'Access-Control-Allow-Origin': '*',
  });
  register_url = environment.register;
  logIn_url = environment.logIn;
  getUser_url = environment.get_user;
  changePassword_url = environment.change_password;
  updateProfile_url = environment.update_profile;

  isLogin = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLogin.asObservable();

  user = new BehaviorSubject<any>({});
  user$ = this.user.asObservable();

  //constructor
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private cartService: LocalCartService
  ) {
    if (sessionStorage.getItem('token')) {
      this.isLogin.next(true);
      this.getUserDetails().subscribe();
    }
  }

  registration(data: Register) {
    try {
      return this.http
        .post<RegisterResponse>(this.base_url + this.register_url, data)
        .pipe(
          tap(() => {
            this.toastr.success(
              'You have successfully signed up!',
              'Sign-Up Successful'
            );
          })
        );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  logIn(data: LogIn) {
    try {
      return this.http.post<LoginResponse>(this.base_url + this.logIn_url, data).pipe(
        tap((res) => {
          this.isLogin.next(true);
          let token = res.data.token;
          let user = res.data.user;
          console.log(res);

          console.log(res.data);
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(user));
          this.toastr.success('You have successfully logged in!');
          this.isLogin.next(true);
          this.router.navigate(['']);

          //get User cart
          this.cartService.checkCart();
        })
      );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  //logout
  logOut() {
    let user = sessionStorage.getItem('user');
    let userName: string;
    if (user) {
      let userObj = JSON.parse(user);
      userName = userObj.username;
    }

    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.toastr.success(
        'You have successfully logged out.',
        'Logout Successful'
      );
      this.isLogin.next(false);
      // console.log('logout');
    }
  }

  getUserDetails() {
    try {
      return this.http
        .get<CustomerDetailsResponse>(this.base_url + this.getUser_url, { headers: this.headers })
        .pipe(
          tap((res) => {
            this.user.next(res.data);
          })
        );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  //change password call api and data is oldPassword and newPassword
  changePassword(data: ChangePasswordRequest) {
    try {
      return this.http
        .put<ChangePasswordResponse>(this.base_url + this.changePassword_url, data)
        .pipe(
          tap(() => {
            this.toastr.success('Your password has been changed successfully');
          })
        );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  updateProfile(data: UserUpdate) {
    try {
      return this.http.put<UserUpdateResponse>(this.base_url + this.updateProfile_url, data, {
        headers: this.headers,
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  //addresses manage
  address_delete_url = environment.address_delete;
  add_address_url = environment.add_address;
  encrypt_url = environment.encrypt;
  address_edit_url = environment.address_edit;
  //Add address
  addAddress(data: AddAddress) {
    try {
      console.log(this.base_url + this.add_address_url);

      return this.http
        .post<AddAddressResponse>(this.base_url + this.add_address_url, data, {
          headers: this.headers,
        })
        .pipe(
          tap(() => {
            const data = this.user.getValue();
            console.log(data);
            data.addresses.push(data);
            this.user.next(data);

            this.toastr.success('Your address has been added successfully');
          })
        );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  updateAddress(data: AddressUpdateRequest, encryptId: string, id: number) {
    const headers = new HttpHeaders({
      address_id: String(encryptId),
    });

    try {
      return this.http
        .put<AddressUpdateResponse>(this.base_url + this.address_edit_url, data, { headers })
        .pipe(
          tap((res) => {
            console.log(res);
            this.getUserDetails().subscribe();
            this.toastr.success('Address updated successfully!', 'Success');
          })
        );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  deleteAddress(id: number) {
    this.encrypt(id).subscribe({
      next: (res) => {
        console.log(res.data);
        const encryptId = res.data;
        const headers = new HttpHeaders({
          address_id: String(encryptId),
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        });

        this.http
          .delete<AddressDeleteResponse>(this.base_url + this.address_delete_url, { headers })
          .subscribe({
            next: () => {
              const data = this.user.getValue();
              let addresses = data.addresses;
              const index = addresses.findIndex((i: any) => i.id === id);
              if (index !== -1) {
                addresses.splice(index, 1);
                this.user.next(data);
                this.toastr.warning('Address deleted successfully!', 'Success');
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  encrypt(id: number) {
    const headers = new HttpHeaders({
      id: String(id),
      'ngrok-skip-browser-warning': 'skip-browser-warning',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.get<EncryptApiResponse>(this.base_url + this.encrypt_url, {
      headers,
    });
  }

  address = new BehaviorSubject<any>('');
  address$ = this.address.asObservable();

  getAddress(id: number) {
    this.user$.subscribe({
      next: (value) => {
        let data = value.addresses.find((address: any) => address.id == id);
        console.log(value);
        this.address.next(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  orders_get_url = environment.order_get;
  getOrders() {
    try {
      return this.http.get<getOrders>(this.base_url + this.orders_get_url, {
        headers: this.headers,
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
}
