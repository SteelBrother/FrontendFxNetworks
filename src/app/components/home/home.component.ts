import { Subscription } from 'rxjs';
import { IEmpleado } from './../../models/iempleado';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  empleados?:IEmpleado[];
  subRef$?:Subscription;

  constructor(
    private http:HttpClient
  ) { }
  
  ngOnInit(): void {
    let httpHeader: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    console.log('get token', token);

    httpHeader = httpHeader.append('Authorization','Bearer'+ token);
    this.subRef$ = this.http.get<IEmpleado[]>('https://localhost:5001/api/Employees',
    {
      headers: httpHeader,
      observe:'response'
    }).subscribe(res =>{
      // this.empleados? = res.body;
    },
      err => {
      console.log('Error al recuperar los empleados',)
    }
    )
  }


  ngOnDestroy(): void {
    if (this.subRef$){
      this.subRef$.unsubscribe();
    }
  }
}
