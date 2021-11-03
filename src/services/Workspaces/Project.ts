export class Project {

    public name: string;
    public id: number;

    constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}