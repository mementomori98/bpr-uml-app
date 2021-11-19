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
    async getProject(id) {
        const res = await this.client.get('projects/' + id);
        return res;
    }
    async manageProjectUsers(id, request) {
        return await this.client.put('projects/' + id + '/users', request);
    }
    async create(request) {
        return await this.client.post('projects', request);
    }
}
//# sourceMappingURL=ProjectService.js.map