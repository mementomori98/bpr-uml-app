export class Model<T> {

    constructor(init?: Partial<T>) {
        Object.assign(this, init);
    }
}