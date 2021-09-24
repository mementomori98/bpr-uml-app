import { AuthenticationService } from "./AuthenticationService";
class Factory {
    constructor() {
        this.register = new Map();
        this.set(new AuthenticationService());
    }
    set(item) {
        this.register.set(typeof item, item);
    }
    get() {
        return this.get_u(null);
    }
    get_u(u) {
        return this.register.get(typeof (u));
    }
}
const factory = new Factory();
export { factory };
//# sourceMappingURL=Factory.js.map