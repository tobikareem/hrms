import { ProjectsRoute } from './pages/projects/project-route';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeService } from './services/employee.service';
import { authGuardFn } from './shared/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => {
            return import('./pages/registration/registration.component').then((m) => m.RegistrationComponent)
        }
    },
    {
        path: 'employees',
        title: "Employees",
        loadChildren: () => {
            return import('./pages/employees/employees.route').then((m) => m.EmployeesRoute)
        },
        providers: [EmployeeService],
        canActivate: [authGuardFn]
    },
    {
        path: 'projects',
        title: "Projects",
        loadChildren: () => {
            return import('./pages/projects/project-route').then((m) => m.ProjectsRoute)
        }
    },
    {
        path: 'footer',
        loadComponent() {
            return import('./shared/components/footer/footer.component').then((m) => m.FooterComponent)
        },
    },
    {
        path: 'timeoff',
        loadComponent: () => { return import('./pages/work/time-off-mamnagement/time-off-mamnagement.component').then((m) => m.TimeOffMamnagementComponent) }
    }
];
