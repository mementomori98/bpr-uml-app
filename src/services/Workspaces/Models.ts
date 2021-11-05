import {Model} from "../Model";

export class CreateWorkspaceRequest {

    public name: string;

    constructor(init?: Partial<CreateWorkspaceRequest>) {
        Object.assign(this, init);
    }
}

export class Workspace extends Model<Workspace>{

    public name: string;
    public _id: string;
    
}

export class JoinWorkspaceRequest {

    public invitationId: string;
    public accepted: boolean;

    constructor(init?: Partial<JoinWorkspaceRequest>) {
        Object.assign(this, init);
    }

}