import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
import "../projects/Models";
import "./Models";
export class TeamService {
    constructor() {
        this.client = getService(RestClient);
    }
    async create(request) {
        return await this.client.post('teams', request);
    }
    async getWorkspaceTeams(id) {
        const res = await this.client.get('workspaces/' + id + '/teams');
        return res;
    }
    async getTeam(id) {
        const res = await this.client.get('teams/' + id);
        return res;
    }
    async manageTeamUsers(id, request) {
        return await this.client.put('teams/' + id + '/users', request);
    }
    async getProjectTeams(id) {
        const res = await this.client.get('workspaces/' + id + '/teams');
        return res;
    }
}
//# sourceMappingURL=TeamService.js.map