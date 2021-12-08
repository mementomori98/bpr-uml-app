import {Model} from "../utils/Model";
import type {TeamUserRequest} from "../users/Models";

export class Team {
    public name: string;
    public usersAmount: number;
    public projectsAmount: number;
    public id: number;

    public constructor(init?: Partial<Team>) {
        Object.assign(this, init);
    }
}

export class AddTeamUsersRequest extends Model<AddTeamUsersRequest> {
    public users: TeamUserRequest[];
}

export class CreateTeamRequest extends Model<CreateTeamRequest> {
    public name: string;
    public workspaceId: string;
}

export class RenameTeamRequest extends Model<RenameTeamRequest> {
    public name: string;
}

export class TeamResponse extends Model<TeamResponse> {
    public _id: string;
    public name: string;
    public users: [];
    public workspaceId: string;
}