export class Project {
    public name: string;
    public id: number;

    public constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}