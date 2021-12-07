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
    async validateWorkspacePermissions(permType = "") {
        let id = this.context.getWorkspaceId();
        if (permType === "" || id === null || id === "")
            return false;
        try {
            const res = await this.getWorkspaceUser(id);
            return !!res.permissions.includes(permType);
        }
        catch (e) {
            return false;
        }
    }
    async validateProjectPermissions(permType = "", projectId = "") {
        if (permType === "" || projectId === null || projectId === "")
            return false;
        try {
            const res = await this.getProjectUser(projectId);
            return res.isProjectManager;
        }
        catch (e) {
            return false;
        }
    }
    async getWorkspaceUser(id) {
        const res = await this.client.get('workspaces/' + id + '/user');
        return res;
    }
    async getProjectUser(id) {
        const res = await this.client.get('projects/' + id + '/user');
        return res;
    }
}
//# sourceMappingURL=UserService.js.map