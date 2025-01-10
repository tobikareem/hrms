import { HttpInterceptorFn } from '@angular/common/http';
import { hasPermissions } from '../operators/has-permissions-operator';
import { Permissions } from '../../infrastructure/enums/permissions';

export const employeePermissionInterceptorFn: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(hasPermissions([Permissions.ViewEmployees, Permissions.CreateEmployees, Permissions.DeleteEmployees, Permissions.EditEmployees]));
};
