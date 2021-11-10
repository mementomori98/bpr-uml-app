
class Factory {
    public static readonly map = new Map();
}

export default function getService<TType>(cls: new() => TType): TType {
    return Factory.map.get(cls.name)();
}

export function register<TType>(cls: new() => TType, creator: () => TType) {
    Factory.map.set(cls.name, creator);
}
