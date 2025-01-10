import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../infrastructure/types/employee';
import { Env } from '../shared/utilities/constant';

@Injectable()
export class EmployeeService {
  searchEmployees(search: string): Observable<Employee[]> {
    throw new Error('Method not implemented.');
  }
  
  employees: Employee[] = [];

  private readonly env = inject(Env);

  private readonly url: string = `${this.env.apiUrl}/employees`;

  constructor() { 
    this.employees.push({
      id: 4,
      firstName: 'John Doe',
      email: 'j@email.com',
      lastName: 'Julian',
      position: 'Developer',
      level: 'Junior',
      isAvailable: true,
      profilePicture: 'https://randomuser.me/api/portraits'
    });

    this.employees.push({
      id: 5,
      firstName: 'Jane Doe',
      email: 'g@email.com',
      lastName: 'Doe',
      position: 'Designer',
      level: 'Middle',
      isAvailable: false,
      profilePicture: 'https://randomuser.me/api/portraits'
    });
  }

  getEmployees(): Observable<Employee[]> {
    return new Observable<Employee[]>(observer => {
      observer.next(this.employees);
    });
  }
  
  getEmployee(id: number): Observable<Employee> {

    return new Observable<Employee>(observer => {
      const employee = this.employees.find(e => e.id === id);

      if (employee) {
        observer.next(employee);
      } else {
        observer.error('Employee not found');
      }
    });
    
  }

  createEmployee(value: Employee) {
    throw new Error('Method not implemented.');
  }

}
