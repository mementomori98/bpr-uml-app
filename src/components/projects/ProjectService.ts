import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";
import type {CreateProjectRequest} from "./Models";
import type {AddProjectUsersRequest} from "./Models";

export class ProjectService {

    private client = getService(RestClient);

    public async getWorkspaceProjects(id: string) {
        const res = await this.client.get('workspaces/' + id + '/projects');
        return res;
    }

    public async getProject(id: string) {
        const res = await this.client.get('projects/' + id);
        return res;
    }

    public async manageProjectUsers(id: string, request: AddProjectUsersRequest) {
        return await this.client.put('projects/' + id + '/users', request);
    }

    public async create(request: CreateProjectRequest){
        return await this.client.post('projects', request);
    }

}