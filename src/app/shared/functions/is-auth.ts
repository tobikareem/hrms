import { inject } from '@angular/core';
import { AuthService } from './../../services/auth.service';

/**
 * Returns an observable that emits a boolean value indicating whether the user is authenticated or not.
 */
export function isAuth() {
    const authServie = inject(AuthService);
    return authServie.isAuthenticated$.asObservable();
}
