import { AsyncPipe, NgComponentOutlet, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../../../infrastructure/types/employee';
import { RouterLink } from '@angular/router';
import { FormControl } from '@angular/forms';
import { createSearch } from '../../../shared/functions/create-search';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, NgComponentOutlet, NgOptimizedImage, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {

  private readonly employeeService = inject(EmployeeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly title = inject(Title);

  isConfirmationOpen = false;
  confirmDialog: any = null;

  searchControl = new FormControl('');
  search$ = createSearch(this.searchControl, this.destroyRef);

  employees$!: Observable<Employee[]>;

  count = signal(0);
  names = signal<string[]>([]);

  max_count = signal(10);

  constructor() {

    effect(() => {
      this.title.setTitle('Lists');
    });

    this.count.set(5);
    const a = signal(2);
    const b = signal(3);
    const c = computed(() => a() + b());

    console.log('Computed:', c());

    b.update((value) => value + 1);

    console.log('Computed after update:', c());

    this.names.set(['John', 'Jane', 'Doe']);

    effect(() => {
      console.log('Count:', this.count())
      console.log('Names from effect:', this.names())
    });

    console.log('.... After c', c());

    this.names.update((names) => [...names, 'Tobi', 'Kareem']);
  }

  ngOnInit() {

    const increment = () => this.count.update((count) => count + 1);
    increment();

    const doubleCount = computed(() => this.count() * 2);

    this.employees$ = this.employeeService.getEmployees();

    this.search$.subscribe((search) => {
      if (!search) {
        this.employees$ = this.employeeService.getEmployees();
      }
      else {
        this.employees$ = this.employeeService.searchEmployees(search);
      }
    });
  }

  async showConfirmationDialog() {
    this.confirmDialog = await import('../../../shared/components/confirmation-dialog/confirmation-dialog.component')
      .then((m) => m.ConfirmationDialogComponent);

    this.isConfirmationOpen = true;
  }

}