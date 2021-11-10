class Factory {
}
Factory.map = new Map();
export default function getService(cls) {
    return Factory.map.get(cls.name)();
}
export function register(cls, creator) {
    Factory.map.set(cls.name, creator);
}
//# sourceMappingURL=ServiceFactory.js.map