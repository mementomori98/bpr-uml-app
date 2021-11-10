import getService from "../../refactor/utils/ServiceFactory";
import { RestClient } from "../../refactor/utils/RestClient";
export class ProjectService {
    constructor() {
        this.client = getService(RestClient);
    }
    async getWorkspaceProjects(id) {
        const res = await this.client.get('workspaces/' + id + '/projects');
        return res;
    }
    async create(request) {
        return await this.client.post('projects', request);
    }
}
//# sourceMappingURL=ProjectService.js.map