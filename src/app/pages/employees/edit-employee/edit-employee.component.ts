import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PermissionsService } from '../../../services/permissions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeForm } from '../../../infrastructure/types/employee-form';
import { Permissions } from '../../../infrastructure/enums/permissions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit{

  private readonly permissionService = inject(PermissionsService);
  private readonly destroyRef = inject(DestroyRef);

  form = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    position: new FormControl('', { nonNullable: true, }),
    level: new FormControl('', { nonNullable: true, }),
  });

  ngOnInit() {

    this.permissionService.hasPermission(Permissions.EditEmployeePrivateDetails)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((hasPermission) => {

        if (!hasPermission) {
          this.form.controls.firstName.disable();
          this.form.controls.lastName.disable();
          this.form.controls.email.disable();
        } else {
          this.form.controls.firstName.enable();
          this.form.controls.lastName.enable();
          this.form.controls.email.enable();
        }

      });

  }

}
