import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/Models/login-model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userService: UserService;

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
  constructor(userService: UserService) {
    this.userService = userService;
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

  onSubmit() {
    this.userService.login(this.loginForm.value);
  }
}
