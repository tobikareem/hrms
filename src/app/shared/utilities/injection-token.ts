export class InjectionToken<T> {
    constructor(public readonly value: T) { }
}

class Injector {
    private static readonly _injector = new Map<InjectionToken<any>, any>();

    static get<T>(token: InjectionToken<T>): T {
        return this._injector.get(token);
    }

    static set<T>(token: InjectionToken<T>, value: T): void {
        this._injector.set(token, value);
    }

    provide<T>(dependency: T): InjectionToken<T> {
        const token = new InjectionToken<T>(dependency);
        Injector.set(token, dependency);

        return token;
    }

    inject<T>(token: InjectionToken<T>): T {
        return Injector.get(token);
    }
}

