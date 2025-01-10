import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly http = inject(HttpClient);
  isAuthenticated$ = new BehaviorSubject<boolean>(true);

  login(credentials: { email: string, password: string }) {
    return this.http.post('/api/auth/login', credentials)
      .pipe(tap(() => this.isAuthenticated$.next(true)));
  }

  logout() {
    return this.http.post('/api/auth/logout', {})
      .pipe(tap(() => this.isAuthenticated$.next(false)));
  }

  getToken(): boolean {
    return localStorage.getItem('token') != null;
  }

  hasPermission(permission: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  hasRole(role: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
