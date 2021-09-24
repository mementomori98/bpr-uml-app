import {AuthenticationService} from "./AuthenticationService";

class Factory {

    private register = new Map();

    constructor() {
        this.set<AuthenticationService>(new AuthenticationService());
    }

    set<T>(item: T) {
        this.register.set(typeof item, item);
    }

    get<T>(): T {
        return this.get_u<T>(null);
    }

    private get_u<T>(u: T) {
        return this.register.get(typeof(u));
    }


}

const factory = new Factory();

export {factory}