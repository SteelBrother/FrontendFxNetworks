import { IEmpleado } from './../models/iempleado';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  myAppUrl = 'https://localhost:5001';
  myApiUrl = '/api/Employees/'
  list:IEmpleado[] | undefined;
  private updateForm = new BehaviorSubject<IEmpleado>({} as any);

  constructor(private http: HttpClient) {}

  SaveEmployee(empleado: IEmpleado):Observable<IEmpleado>{
    return this.http.post<IEmpleado>(this.myAppUrl + this.myApiUrl, empleado);
  }

  getEmployess(){
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise().then(data => {
      this.list = data as IEmpleado[];
    })
  }

  deleteEmployee(id: number):Observable<IEmpleado>{
    return this.http.delete<IEmpleado>(this.myAppUrl + this.myApiUrl + id )
  }

}
