import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorModel } from 'src/Models/error-model';
import { LoginModel } from 'src/Models/login-model';
import { ALL_ERRORS, LoginRequiredError } from 'src/utils/errors';
import { PortfolioService } from '../portfolio.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = {
    username: '',
    password: ''
  };

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(
      this.loginModel.username,
      [
        Validators.required,
      ]
    ),
    password: new FormControl(
      this.loginModel.password,
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ),
  });
  showLoginRequired: boolean = true;
  errors: ErrorModel[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService,
    private portfolioService: PortfolioService 
  ) {
    route.paramMap.subscribe(params => {
      this.errors = [];
      this.loginModel = {
        username: '',
        password: ''
      };

      let errorId = Number(params.get('error') || -1);
      let error = ALL_ERRORS.find(item => item.id === errorId);
      if(error !== undefined){
        this.errors.push(error);
      }
    });
  }

  ngOnInit(): void {
  }

  get username() {
    let username = this.loginForm.get('username');
    return username;
  }

  get password() {
    let password = this.loginForm.get('password');
    return password;
  }

  async onSubmit() {

    var res = await this.userService.login(this.loginForm.value);
    this.errors = [];

    if(res.success){
      this.portfolioService.updatePortfolioDetail();
      this.router.navigate(['/dashboard']);
    }
    else{
      this.errors.push(new ErrorModel(res.message));
    }
  }
}
