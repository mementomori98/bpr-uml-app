export class CreateWorkspaceRequest {

    public name: string;

    constructor(init?: Partial<CreateWorkspaceRequest>) {
        Object.assign(this, init);
    }
}

export class UpdateUserPermissions {

    public permissions: string[];

    constructor(init?: Partial<UpdateUserPermissions>) {
        Object.assign(this, init);
    }
}

export class Workspace {

    public name: string;
    public _id: string;

    constructor(init?: Partial<CreateWorkspaceRequest>) {
        Object.assign(this, init);
    }
}

export class WorkspaceInvitation {
    public inviteeEmailAddress: string;
    public inviterId: string;
    public inviterUserName: string;
    public workspaceId: string;
    public workspaceName: string;
    public _id: string;

    constructor(init?: Partial<WorkspaceInvitation>) {
        Object.assign(this, init);
    }
}

export class JoinWorkspaceRequest {

    public invitationId: string;
    public accepted: boolean;

    constructor(init?: Partial<JoinWorkspaceRequest>) {
        Object.assign(this, init);
    }

}