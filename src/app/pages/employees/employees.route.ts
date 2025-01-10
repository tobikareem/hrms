import { Routes } from "@angular/router";
import { employeeDetailsResolverFn } from "../../shared/resolvers/employee-details-resolver";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { permissionGuardFn } from "../../shared/guards/auth-guard.service";

export const EmployeesRoute: Routes = [
    { path: 'list', component: EmployeeListComponent },
    {
        path: 'details/:id',
        component: EmployeeDetailsComponent,
        resolve: { employee: employeeDetailsResolverFn }
    },
    {
        path: 'create',
        component: CreateEmployeeComponent,
        canActivate: [permissionGuardFn('CreateEmployee')]
    },
    {
        path: 'edit',
        component: EditEmployeeComponent,
        canActivate: [permissionGuardFn('EditEmployee')]
    },
]
