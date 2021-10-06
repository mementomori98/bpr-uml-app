export class CreateWorkspaceRequest {

    public name: string;

    constructor(init?: Partial<CreateWorkspaceRequest>) {
        Object.assign(this, init);
    }
}