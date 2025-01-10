import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule, StatusChangeEvent, Validators, ValueChangeEvent } from '@angular/forms';
import { Employee } from '../../../infrastructure/types/employee';
import { EmployeeForm } from '../../../infrastructure/types/employee-form';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateEmployeeComponent implements OnChanges {

  private readonly employeeService = inject(EmployeeService);

  form = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    position: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    level: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit() {
    if (this.form.valid) {
      this.employeeService.createEmployee(this.form.value as Employee);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.events.subscribe((event) => {

      if (event instanceof StatusChangeEvent) {
        console.log('Form value status changed:', event);
      }

      if(event instanceof ValueChangeEvent) {
        console.log('Form value changed:', event);
      }
    });
  }


}
