import { writable } from "svelte/store";
const key = {};
const createAssociationStore = () => {
    let o = {
        source: null,
        target: null,
        type: null,
        representationId: null,
    };
    const store = writable(o);
    const setSource = s => {
        o.source = s;
        store.set(o);
    };
    const setTarget = t => {
        o.target = t;
        store.set(o);
    };
    const setType = t => {
        o.type = t;
        store.set(o);
    };
    const setRepresentationId = r => {
        o.representationId = r;
        store.set(o);
    };
    return {
        subscribe: store.subscribe,
        setSource,
        setTarget,
        setType,
        setRepresentationId,
    };
};
export { key, createAssociationStore };
//# sourceMappingURL=associationStore.js.map