import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../infrastructure/types/employee';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {

  employee: Employee = inject(ActivatedRoute).snapshot.data['employee'] as Employee;

  canChange = false;


  toggleCanChange() {
    this.canChange = !this.canChange;
  }

}
