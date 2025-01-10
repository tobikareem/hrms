import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { authInterceptorProviderFn } from './shared/interceptors/auth-interceptor.service';
import { TruncateLimit } from './shared/directives/truncate.directive';
import { employeePermissionInterceptorFn } from './shared/interceptors/employee-permission-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),

    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptorProviderFn, employeePermissionInterceptorFn])
    ),

    {provide: TruncateLimit, useValue: 5}
  ]
};
