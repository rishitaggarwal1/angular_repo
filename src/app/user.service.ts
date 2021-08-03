import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Customer } from 'src/Models/customer';
import { LoginModel } from 'src/Models/login-model';


const DEFAULT_USER = {
  username: 'anonymous',
  portfolioId: -1,
  token: ''
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  _user: Customer = DEFAULT_USER;

  isLoggedIn: boolean = false;

  constructor() {
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
    this.isLoggedIn = true;
    this._user = user;
  }

  logout() {
    this._user = DEFAULT_USER;
    this.isLoggedIn = false;
  }

}
