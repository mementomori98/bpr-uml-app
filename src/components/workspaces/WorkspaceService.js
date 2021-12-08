import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
import "./Models";
export class WorkspaceService {
    constructor() {
        this.client = getService(RestClient);
    }
    async create(request) {
        const res = await this.client.post('workspaces', {
            name: request.name,
        });
        return res;
    }
    async join(request) {
        const res = await this.client.post('workspaces/invitation/response', {
            invitationId: request.invitationId,
            accepted: request.accepted
        });
    }
    async get() {
        const res = await this.client.get('workspaces');
        return res;
    }
    async getById(id) {
        const res = await this.client.get('workspaces/' + id);
        return res;
    }
    async renameWorkspace(id, request) {
        return await this.client.put('workspaces/' + id, request);
    }
    async updateUserPermissions(workspaceId, userId, request) {
        return await this.client.put('workspaces/' + workspaceId + "/" + userId + '/permissions', request);
    }
    async deleteWorkspace(id) {
        return await this.client.delete('workspaces/' + id);
    }
    async deleteUser(workspaceId, userId) {
        return await this.client.delete('workspaces/' + workspaceId + '/user/' + userId);
    }
    async deleteCurrentUser(workspaceId) {
        return await this.client.delete('workspaces/' + workspaceId + '/current-user');
    }
}
//# sourceMappingURL=WorkspaceService.js.map