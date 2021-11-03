export class Project {

    public name: string;

    constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}