import {Model} from "../../refactor/utils/Model";

export class CreateProjectRequest extends Model<CreateProjectRequest> {
    public title: string;
    public workspaceId: string;
}

export class Project {
    public name: string;
    public id: number;

    public constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}