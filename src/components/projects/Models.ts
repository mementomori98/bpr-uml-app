import {Model} from "../utils/Model";
import type {ProjectUserRequest} from "../users/Models";
import {ProjectTeamRequest} from "../users/Models";

export class CreateProjectRequest extends Model<CreateProjectRequest> {
    public title: string;
    public workspaceId: string;
}

export class RenameProjectRequest extends Model<RenameProjectRequest> {
    public title: string;
}

export class AddProjectUsersRequest extends Model<AddProjectUsersRequest> {
    public users: ProjectUserRequest[];
}

export class AddProjectTeamsRequest extends Model<AddProjectTeamsRequest> {
    public teams: ProjectTeamRequest[];
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