import { InjectionToken } from "@angular/core"


export const CONSTANTS = {
    dateFormat: 'dd/MM/yyyy',
    fileTruncateLimit: 50
}

export const ENV = {
    production: false,
    apiUrl: 'http://localhost:3000'
}

export const Constants = new InjectionToken('Constants', {
    factory: () => CONSTANTS,
    providedIn: 'root'
});

export const Env = new InjectionToken('Env', {
    factory: () => ENV,
    providedIn: 'root'
});
