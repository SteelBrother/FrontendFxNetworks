import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ilogin } from 'src/app/models/ilogin';
import { IResponse } from 'src/app/models/iresponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

  
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  subRef$!: Subscription;
  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {
    this.formLogin = formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  Login() {
    const usuarioLogin: Ilogin = {
      Email: this.formLogin.value.Email,
      Password: this.formLogin.value.Password,
    };
    this.subRef$ = this.http.post<IResponse>("https://localhost:5001/api/Auth/Login",
    usuarioLogin,{observe:'response'}).
    subscribe(res => {
            const token = res.body?.response;
            console.log('token', token);
            sessionStorage.setItem('token', token!);
            this.router.navigate(['/home']);
          }, err => {
            console.log('Error en el login', err);
          });
  }
    ngOnDestroy() {
      if (this.subRef$) {
        this.subRef$.unsubscribe();
      }
    }
}


//   const url = environment.urlAPI + 'api/identidad/login';
  //   this.subRef$ = this.dataService.post<IResponse>(url,
  //     usuarioLogin)
  //     .subscribe(res => {
  //       const token = res.body.response;
  //       console.log('token', token);
  //       this.securityService.SetAuthData(token);
  //       this.router.navigate(['/home']);
  //     }, err => {
  //       console.log('Error en el login', err);
  //     });
  // }

  // hasError(nombreControl: string, validacion: string) {
  //   const control = this.formLogin.get(nombreControl);
  //   return control.hasError(validacion);
  // }