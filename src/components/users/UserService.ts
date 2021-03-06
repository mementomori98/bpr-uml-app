import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";
import type {UserInvitationRequest} from "./Models";
import {AppContext} from "../utils/AppContext";

export class UserService {

    private readonly client = getService(RestClient);
    private readonly context = getService(AppContext);

    public async getWorkspaceUsers(id: string) {
        const res = await this.client.get('workspaces/' + id + '/users');
        return res;
    }

    public async getUserTeams() {
        const res = await this.client.get('users/teams');
        return res;
    }

    public async getUserInvitations() {
        const res = await this.client.get('users/invitations');
        return res;
    }

    public async inviteUser(request: UserInvitationRequest) {
        const res = await this.client.post('workspaces/invitation', {
            workspaceId: request.workspaceId,
            inviteeEmailAddress: request.inviteeEmailAddress,
        });
        return res;
    }

    public async getCurrentUser() {
        const res = await this.client.post('users', {});
        return res;
    }


    public async validateWorkspacePermissions(permType: string = "") {
        let id = this.context.getWorkspaceId();
        if (permType === "" || id === null || id === "") return false;
        try {
            const res = await this.getWorkspaceUser(id);
            return !!res.permissions.includes(permType);
        } catch (e) {
            return false;
        }
    }

    public async validateProjectPermissions(projectId: string = "") {
        if (projectId === null || projectId === "") return false;
        try {
            const res = await this.getProjectUser(projectId);
            return res.isProjectManager
        } catch (e) {
            return false;
        }
    }

    public async getWorkspaceUser(id: string) {
        const res = await this.client.get('workspaces/' + id + '/user');
        return res;
    }

    public async getProjectUser(id: string) {
        const res = await this.client.get('projects/' + id + '/user');
        return res;
    }
}