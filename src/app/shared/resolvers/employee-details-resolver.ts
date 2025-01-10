import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Employee } from "../../infrastructure/types/employee";
import { EmployeeService } from "../../services/employee.service";


export const employeeDetailsResolverFn: ResolveFn<Employee> = (route: ActivatedRouteSnapshot) => {

    const employeeService = inject(EmployeeService);
    const id = +(route.paramMap.get('id') ?? 0);

    return employeeService.getEmployee(id);
}
