import type {CreateWorkspaceRequest, JoinWorkspaceRequest} from "./Models";
import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";

export class WorkspaceService {

    private readonly client = getService(RestClient);

    public async create(request: CreateWorkspaceRequest) {
        const res = await this.client.post('workspaces', {
            name: request.name,
        });
        // Todo return something relevant
        return res;
    }

    public async join(request: JoinWorkspaceRequest) {
        const res = await this.client.post('invitation/response', {
            invitationId: request.invitationId,
            response: request.accepted
        });
    }

    public async get() {
        const res = await this.client.get('workspaces');
        // Todo return something relevant
        return res;
    }

    public async getById(id: string) {
        const res = await this.client.get('workspaces/' + id);
        // Todo return something relevant
        return res;
    }
}