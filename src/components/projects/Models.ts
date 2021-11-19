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

export class ProjectResponse extends Model<ProjectsResponse> {
    public teams: [];
    public title: string;
    public users: [];
    public workspaceId: string;
    public _id: string;
}