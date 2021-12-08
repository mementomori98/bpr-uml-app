import {Model} from "../utils/Model";

export class UserInvitationRequest {
    workspaceId: string;
    inviteeEmailAddress: string;

    constructor(init?: Partial<UserInvitationRequest>) {
        Object.assign(this, init);
    }
}

export class WorkspaceUsersResponse extends Model<WorkspaceUsersResponse> {
    public email: string;
    public firebaseId: string;
    public name: string;
    public _id: string;
    public permissions: string[];
}

export class WorkspaceTeamsResponse extends Model<WorkspaceTeamsResponse> {
    public name: string;
    public users: [];
    public workspaceId: string;
    public _id: string;
}

export class ProjectTeamRequest  extends Model<ProjectTeamRequest>{
    public teamId: string;
    public isEditor: boolean;
}

export class ProjectUserRequest  extends Model<ProjectUserRequest>{
    public userId: string;
    public isEditor: boolean;
    public isProjectManager: boolean;
}

export class TeamUserRequest  extends Model<ProjectUserRequest>{
    public userId: string;
}

//+++++++++++++++++++++

export class UserToProject  extends Model<UserToProject>{
    public name: string;
    public email: string;
    public isEditor: boolean;
    public isProjectManager: boolean;
    public _id: string;
}

export class TeamToProject  extends Model<UserToProject>{
    public name: string;
    public isEditor: boolean;
    public _id: string;
}

export class UserToTeam {
    public name: string;
    public email: string;
    public _id: string;

    public constructor(init?: Partial<UserToTeam>) {
        Object.assign(this, init);
    }
}