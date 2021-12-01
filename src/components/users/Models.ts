import {Model} from "../utils/Model";

export class User {
    public name: string;
    public email: string;
    public status: 'Invited' | 'Active';
    public role: 'Developer' | 'Admin' | 'Product owner';
    public canEdit: boolean;
    public id: number;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}

//+++++++++++++++++++++

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

export class RemoveWorkspaceUserRequest  extends Model<RemoveWorkspaceUserRequest>{
    public userId: string;
    public workspaceId: string;
}

export class ProjectUserRequest  extends Model<ProjectUserRequest>{
    public userId: string;
    public isEditor: boolean;
}

export class TeamUserRequest  extends Model<ProjectUserRequest>{
    public userId: string;
}

//+++++++++++++++++++++

export class UserToProject  extends Model<UserToProject>{
    public name: string;
    public email: string;
    public isEditor: boolean;
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