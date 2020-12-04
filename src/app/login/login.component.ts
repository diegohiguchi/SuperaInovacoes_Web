import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService) {
  }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const login = new Login();
    login.username = this.loginForm.controls['username'].value;
    login.password = this.loginForm.controls['password'].value;

    this.realizarLogin(login);
  }

  realizarLogin(login: Login) {
    this.loginService.login(login)
      .subscribe(
        data => {
          if (data.success) {
            localStorage.setItem('currentUser', JSON.stringify(login));
            this.router.navigate(['listar-produto']);
          }
          else {
            alert('Usuário não cadastrado');
            this.router.navigate(['']);
          }
        },
        error => {
          alert(error);
        });
  }

}
