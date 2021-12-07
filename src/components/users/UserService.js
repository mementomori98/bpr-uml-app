import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
import { AppContext } from "../utils/AppContext";
export class UserService {
    constructor() {
        this.client = getService(RestClient);
        this.context = getService(AppContext);
    }
    async getWorkspaceUsers(id) {
        const res = await this.client.get('workspaces/' + id + '/users');
        return res;
    }
    async getUserTeams() {
        const res = await this.client.get('users/teams');
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
    async getWorkspaceUser(id) {
        const res = await this.client.get('workspaces/' + id + '/user');
        return res;
    }
    async getProjectUser(id) {
        const res = await this.client.get('projects/' + id + '/user');
        return res;
    }
    async validateWorkspacePermissions(permType = "") {
        let workspaceId = this.context.getWorkspaceId();
        if (permType === "" || workspaceId === null || workspaceId === "")
            return false;
        try {
            const res = await this.getWorkspaceUser(workspaceId);
            return !!res.permissions.includes(permType);
        }
        catch (e) {
            return false;
        }
    }
    validateProjectPermissions() {
    }
}
//# sourceMappingURL=UserService.js.map