import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ISignUp } from '../../models/signUp';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { ILogin } from '../../models/login';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-auth',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css',
})
export class UserAuth {
  visible: boolean = false;
background: any;

  showDialog() {
    this.visible = true;
  }

  showLogin: boolean = false;

  signUpFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern(/^[a-z ]{3,20}$/i),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern(
        /^[a-z0-9_ \-!@#$%^&*()_+=\[\]{};:'"\\,.<>\/?|\\]{8,20}$/i
      ),
    ]),
  });

  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSignUp(data: ISignUp) {
    console.warn('sign up', data);
  }

  setUserSignUp() {
    if (this.signUpFormGroup.valid) {
      this.userService
        .userSignUp(this.signUpFormGroup.value)
        .subscribe((res: any) => {
          console.log('userSignUp ::', res);
          console.log('userFormGroup ::', this, this.signUpFormGroup.value);

          if (res) {
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/home']);
          }
        });
    }
  }

  setUserLogin() {
    this.userService.userLogin(this.loginFormGroup.value).subscribe((res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
        console.log('user login', res);
      }
    });
  }

  login(data: ILogin) {
    console.warn('login', data);
    this.setUserLogin();
  }

  openLoginForm() {
    this.showLogin = true;
  }
  openSignUpForm() {
    this.showLogin = false;
  }
}
