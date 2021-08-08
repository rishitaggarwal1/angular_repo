import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Customer } from 'src/Models/customer';
import { LoginModel } from 'src/Models/login-model';
import { ApiResponse } from 'src/Models/login-response';
import { AUTH_SERVICE_URL, CALNET_SERVICE_URL } from 'src/utils/api-urls';


const DEFAULT_USER = {
  username: 'Not Logged In',
  portfolioId: -1,
  token: ''
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  _user: Customer = { ...DEFAULT_USER};
  _isLoggedIn: boolean = false;
  loginUrl = AUTH_SERVICE_URL + "/api/auth/login";
  testUrl = CALNET_SERVICE_URL + '/api/Portfolio/calculateNetWorth/'
  constructor(private router: Router, private http: HttpClient) {
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

  async login(loginModel: LoginModel) {

    let data = await this.http.post<Customer>(this.loginUrl, loginModel)
      .pipe(
        map<Customer, ApiResponse>(this.mapDataToApiReponse)
      )
      .pipe(
        catchError(this.mapErrorToApiReponse)
      )
      .toPromise()
    
    if(data.success){
      this._user = data.content || { ...DEFAULT_USER};
      this._isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(this._user));
    }
   
    return data;
    // let user: Customer = { portfolioId: 1, username: 'Raghav', token: "xyz" };

  }

  logout() {
    this._user = { ...DEFAULT_USER};
    this._isLoggedIn = false;
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }

  mapDataToApiReponse(data: Customer){
    // Updating the service state
    this._user = data;
    this._isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(this._user));     
    return {
      success: true,
      message: "Logged in successfully",
      content: data
    };

  }

  mapErrorToApiReponse(error: any){
    console.log(error, error.error);
    let res: ApiResponse = {
      success: false,
      message: error?.error?.message || error.statusText,
      content: null
    };
    return of(res);
  }

}
