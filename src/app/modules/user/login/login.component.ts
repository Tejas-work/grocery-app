import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogIn } from 'src/app/shared/models/login.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  message: any;
  loginForm!: FormGroup;

  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  check() {
    this.authService.isLogin$.subscribe(
      {
        next: (res) => {
  

          if (res) {
            this.router.navigate(['']);
          }
        }
      }
    )

  }
  ngOnInit() {
    this.check()
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    let user: LogIn = {
      username: this.userName?.value,
      password: this.password?.value,
    };

    console.log(user);
    this.authService.logIn(user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        this.message = error.error.message;
      },
    });
  }
}
