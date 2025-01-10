import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Permissions } from '../infrastructure/enums/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {


  private readonly permissions$ = new BehaviorSubject<Partial<Record<Permissions, boolean>>>({
    viewEmployees: true,
  });

  hasPermission(permission: Permissions): Observable<boolean> {
    return this.permissions$.pipe(
      map(perm => perm[permission] ?? false)
    );
  }

  hasPermissions(permissions: Permissions[]): Observable<boolean> {

    return this.permissions$.pipe(
      map(perm => permissions.every(permission => perm[permission] ?? false))
    );
  }

  setPermission(permissions: Partial<Record<Permissions, boolean>>): void {
    this.permissions$.next({
      ...this.permissions$.value,
      ...permissions
    });
  }

  revokePermission(permissions: Permissions): void {
    this.permissions$.next({ ... this.permissions$.getValue(), [permissions]: false });
  }


}
