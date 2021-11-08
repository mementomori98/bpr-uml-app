export class CreateWorkspaceRequest {

    public name: string;

    constructor(init?: Partial<CreateWorkspaceRequest>) {
        Object.assign(this, init);
    }
}

export class Workspace {

    public name: string;
    public id: string;

    constructor(init?: Partial<CreateWorkspaceRequest>) {
        Object.assign(this, init);
    }
}

export class WorkspaceInvitation {

    public name: string;
    public invitor: string;
    public id: string;

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