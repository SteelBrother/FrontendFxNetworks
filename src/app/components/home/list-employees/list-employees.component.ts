import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IEmpleado } from 'src/app/models/iempleado';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  constructor(public employeeService: EmployeeServiceService,
              public toastr:ToastrService) { }

  ngOnInit(): void {
    this.employeeService.getEmployess();
  }

  deleteEmployee(id:number){
    if(confirm('Esta seguro?')){
      this.employeeService.deleteEmployee(id).subscribe(data =>{
        this.toastr.warning('Registro eliminado');
        this.employeeService.getEmployess();
      })
    }
  }

}
