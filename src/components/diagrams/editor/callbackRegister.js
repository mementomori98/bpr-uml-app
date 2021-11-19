import "svelte/store";
import "svelte/internal";
import "../../utils/Model";
const key = {};
class CallbackRegister {
    constructor() {
        this.callbacks = [];
    }
    add(name, cb) {
        this.callbacks.push(new Callback(name, cb));
    }
    remove(cb) {
        this.callbacks = this.callbacks.filter(x => x.action !== cb);
    }
    raise(name, o) {
        this.callbacks.filter(cb => cb.name === name).forEach(cb => cb.action(o));
    }
}
class Callback {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }
}
export { key, CallbackRegister };
//# sourceMappingURL=callbackRegister.js.map