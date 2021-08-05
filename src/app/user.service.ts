import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/Models/customer';
import { LoginModel } from 'src/Models/login-model';


const DEFAULT_USER = {
  username: 'Not Logged In',
  portfolioId: -1,
  token: ''
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  _user: Customer = DEFAULT_USER;
  _isLoggedIn: boolean = false;

  constructor(private router: Router) {
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      this._user = JSON.parse(userStr);
      this._isLoggedIn = true;
    }
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  get username() {
    return this._user.username;
  }

  get portfolioId() {
    return this._user.portfolioId;
  }

  get token() {
    return this._user.token;
  }

  login(logins: LoginModel) {
    let user: Customer = { portfolioId: 1, username: 'Raghav', token: "xyz" };
    this._isLoggedIn = true;
    this._user = user;
    this.router.navigate(['/']);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this._user = DEFAULT_USER;
    this._isLoggedIn = false;
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }

}
