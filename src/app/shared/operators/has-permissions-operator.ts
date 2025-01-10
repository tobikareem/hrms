import { filter, map, MonoTypeOperatorFunction, Observable, pipe, tap, withLatestFrom } from "rxjs";
import { Permissions } from "../../infrastructure/enums/permissions";
import { inject } from "@angular/core";
import { PermissionsService } from "../../services/permissions.service";

export function hasPermissions<T>(
    permissions: Permissions[], 
    permissionService = inject(PermissionsService)
): MonoTypeOperatorFunction<T> {
    return pipe(
        withLatestFrom(permissionService.hasPermissions(permissions)),
        filter(([_, hasPermissions]) => hasPermissions),
        map(([item]) => item)
    )
}


function log<T>(message: string = ''): MonoTypeOperatorFunction<T> {

    return pipe(tap(item => console.log(`${message ? message + ': ' : ''}${item}`)));


}