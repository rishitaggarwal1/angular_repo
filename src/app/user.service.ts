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
  
  _router: Router;

  _user: Customer = DEFAULT_USER;
  _isLoggedIn: boolean = false;

  constructor(router: Router) {
    this._router = router;
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
    this._router.navigate(['/']);
  }

  logout() {
    this._user = DEFAULT_USER;
    this._isLoggedIn = false;
    this._router.navigate(['/login']);
  }

}
