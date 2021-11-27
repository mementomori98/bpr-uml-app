import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
import "../projects/Models";
import "../users/Models";
export class WorkspaceService {
    constructor() {
        this.client = getService(RestClient);
    }
    async create(request) {
        const res = await this.client.post('workspaces', {
            name: request.name,
        });
        // Todo return something relevant
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
    async deleteWorkspace(id) {
        return await this.client.delete('workspaces/' + id);
    }
    async deleteUser(request) {
        return await this.client.deleteByObj('workspaces/user', request);
    }
}
//# sourceMappingURL=WorkspaceService.js.map