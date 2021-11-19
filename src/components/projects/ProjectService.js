import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
export class ProjectService {
    constructor() {
        this.client = getService(RestClient);
    }
    async getWorkspaceProjects(id) {
        const res = await this.client.get('workspaces/' + id + '/projects');
        return res;
    }
    async addProjectUsers(id, request) {
        return await this.client.post('projects/' + id + '/users', request);
    }
    async create(request) {
        return await this.client.post('projects', request);
    }
}
//# sourceMappingURL=ProjectService.js.map