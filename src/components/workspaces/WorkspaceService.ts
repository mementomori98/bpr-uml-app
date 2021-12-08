import type {CreateWorkspaceRequest, JoinWorkspaceRequest} from "./Models";
import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";
import {AddProjectUsersRequest} from "../projects/Models";
import {RemoveWorkspaceUserRequest} from "../users/Models";
import {UpdateUserPermissions} from "./Models";

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
        const res = await this.client.post('workspaces/invitation/response', {
            invitationId: request.invitationId,
            accepted: request.accepted
        });
    }

    public async get() {
        const res = await this.client.get('workspaces');
        return res;
    }

    public async getById(id: string) {
        const res = await this.client.get('workspaces/' + id);
        return res;
    }

    public async renameWorkspace(id: string, request: CreateWorkspaceRequest) {
        return await this.client.put('workspaces/' + id, request);
    }

    public async updateUserPermissions(workspaceId: string, userId: string, request: UpdateUserPermissions) {
        return await this.client.put('workspaces/' + workspaceId + "/" + userId + '/permissions', request);
    }

    public async deleteWorkspace(id: string) {
        return await this.client.delete('workspaces/' + id);
    }

    public async deleteUser(workspaceId: string, userId: string) {
        return await this.client.delete('workspaces/' + workspaceId + '/user/' + userId);
    }

    public async deleteCurrentUser(workspaceId: string) {
        return await this.client.delete('workspaces/' + workspaceId + '/current-user');
    }
}