import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
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
    async getProjectTeams(id) {
        const res = await this.client.get('workspaces/' + id + '/teams');
        return res;
    }
}
//# sourceMappingURL=TeamService.js.map