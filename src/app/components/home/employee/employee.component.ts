import { IEmpleado } from './../../../models/iempleado';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  formEmployee:FormGroup;
  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeServiceService,
              private toastr: ToastrService) { 
    this.formEmployee = this.formBuilder.group({
      name:['',[Validators.required]],
      age:['',[Validators.required]],
      salary:['',[Validators.required]],
      position:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  SaveEmployee(){
    const employee:IEmpleado = {
      id:this.formEmployee.get('id')?.value,
      name: this.formEmployee.get('name')?.value,
      age: this.formEmployee.get('age')?.value,
      salary: this.formEmployee.get('salary')?.value,
      position: this.formEmployee.get('position')?.value
    }
    this.employeeService.SaveEmployee(employee).subscribe(data =>{
      this.toastr.success('Registro Agregado');
      console.log('Guardado exitosamente');
      this.formEmployee.reset();
      this.employeeService.getEmployess();
    })
  }
}
