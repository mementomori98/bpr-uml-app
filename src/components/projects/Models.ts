import {Model} from "../utils/Model";
import type {ProjectUserRequest} from "../users/Models";

export class CreateProjectRequest extends Model<CreateProjectRequest> {
    public title: string;
    public workspaceId: string;
}

export class addProjectUsersRequest extends Model<addProjectUsersRequest> {
    public users: ProjectUserRequest[];
}

export class ProjectsResponse extends Model<ProjectsResponse> {
    public _id: string;
    public title: string;
    public workspaceId: string;
    public users: [];
    public teams: [];
}

export class Project {
    public name: string;
    public id: number;

    public constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}