import { NgClass } from '@angular/common';
import { AfterViewInit, Directive, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToolTipDirective } from './tool-tip.directive';

@Directive({
  selector: 'a[routerLink]',
  hostDirectives: [NgClass, { directive: ToolTipDirective, inputs: ['tooltip'] }],
  standalone: true
})
export class EmployeeNotAvailableDirective implements AfterViewInit {

  private readonly ngClassRef = inject(NgClass);
  private readonly routerLinkRef = inject(RouterLink);
  private readonly employeeService = inject(EmployeeService);
  private readonly toolTipRef = inject(ToolTipDirective);

  ngAfterViewInit(): void {

    if (this.routerLinkRef.href!.startsWith('/employees/details')) {
      const employeeId = this.routerLinkRef.urlTree?.root.children['primary']?.segments.at(-1)?.path;

      if (employeeId) {
        this.employeeService.getEmployee(+employeeId).subscribe(employee => {
          this.ngClassRef.ngClass = { 'not-available': !employee.isAvailable };

          this.toolTipRef.tooltip = employee.isAvailable ? '' : 'Employee is not available';
        });
      }

    }

  }
}
