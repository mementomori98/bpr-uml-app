import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
export class UserService {
    constructor() {
        this.client = getService(RestClient);
    }
    async getWorkspaceUsers(id) {
        const res = await this.client.get('workspaces/' + id + '/users');
        return res;
    }
    async getUserInvitations() {
        const res = await this.client.get('users/invitations');
        return res;
    }
    async inviteUser(request) {
        const res = await this.client.post('workspaces/invitation', {
            workspaceId: request.workspaceId,
            inviteeEmailAddress: request.inviteeEmailAddress,
        });
        // Todo return something relevant
        return res;
    }
    async getCurrentUser() {
        const res = await this.client.post('users', {});
        // Todo return something relevant
        return res;
    }
}
//# sourceMappingURL=UserService.js.map