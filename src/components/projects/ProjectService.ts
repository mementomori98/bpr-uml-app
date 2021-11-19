import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";
import type {CreateProjectRequest} from "./Models";
import type {addProjectUsersRequest} from "./Models";

export class ProjectService {

    private client = getService(RestClient);

    public async getWorkspaceProjects(id: string) {
        const res = await this.client.get('workspaces/' + id + '/projects');
        return res;
    }

    public async addProjectUsers(id: string, request: addProjectUsersRequest) {
        return await this.client.post('projects/' + id + '/users', request);
    }

    public async create(request: CreateProjectRequest){
        return await this.client.post('projects', request);
    }

}