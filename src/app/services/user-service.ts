import { Injectable } from '@angular/core';
import { ILogin } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { ISignUp } from '../models/signUp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: ILogin | undefined;

  private userServerUrl = 'http://localhost:3000/floralUsers/';

  private getUserCredentialsUrl(): string {
    return `http://localhost:3000/floralUsers?email=${this.userData?.email}&password=${this.userData?.password}`;
  }

  constructor(private http: HttpClient) {}

  userSignUp(user: ISignUp): Observable<ISignUp> {
    return this.http.post<ISignUp>(this.userServerUrl, user);
  }

  userLogin(user: ILogin): Observable<ILogin> {
    this.userData = user;
    const credentialsUrl = this.getUserCredentialsUrl();
    return this.http.get<ILogin>(credentialsUrl);
  }
}
