import {writable} from "svelte/store";
import {binding_callbacks} from "svelte/internal";
import {Model} from "../../utils/Model";

const key = {};

class CallbackRegister {
    private callbacks: Array<Callback> = [];

    public add(name: string, cb: (o: any) => void) {
        this.callbacks.push(new Callback(name, cb));
    }

    public remove(cb: (o: any) => void) {
        this.callbacks = this.callbacks.filter(x => x.action !== cb);
    }

    public raise(name: string, o: any) {
        this.callbacks.filter(cb => cb.name === name).forEach(cb => cb.action(o));
    }
}

class Callback {
    public name: string;
    public action: (o: any) => void;

    public constructor(name: string, action: (o: any) => void) {
        this.name = name;
        this.action = action;
    }
}

export {key, CallbackRegister};