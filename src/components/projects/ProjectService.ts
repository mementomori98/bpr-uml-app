import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";
import type {CreateProjectRequest} from "./Models";
import type {AddProjectUsersRequest} from "./Models";
import type {AddProjectTeamsRequest, RenameProjectRequest} from "./Models";

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

    public async renameProject(id: string, request: RenameProjectRequest) {
        return await this.client.put('projects/' + id, request);
    }

    public async deleteProject(id: string) {
        return await this.client.delete('projects/' + id);
    }

    public async manageProjectUsers(id: string, request: AddProjectUsersRequest) {
        return await this.client.put('projects/' + id + '/users', request);
    }

    public async manageProjectTeams(id: string, request: AddProjectTeamsRequest) {
        return await this.client.put('projects/' + id + '/teams', request);
    }

    public async create(request: CreateProjectRequest){
        return await this.client.post('projects', request);
    }

    public async getContent(projectId: string) {
        return {
            _id: projectId,
            name: 'Dummy Project',
            items: [
                {name: '', path: '/folder1/', type: 'folder'},
                {name: '', path: '/folder2/', type: 'folder'},
                {name: '', path: '/folder1/subfolder1/', type: 'folder'},
                {name: '', path: '/folder1/subfolder2/', type: 'folder'},
                {name: 'diagram1', path: '/', type: 'diagram', id: '61a0d2fa28f1167d4bbb87de'},
                {name: 'diagram2', path: '/folder1/', type: 'diagram', id: '61a0d289cdfe942f939a1d7c'},
                {name: 'model1', path: '/folder1/subfolder1/', type: 'model', id: 'dummyId'},
                {name: 'model2', path: '/folder2/', type: 'model', id: 'dummyId'},
            ]
        };
        // return await this.client.get(`projects/${projectId}/content`);
    }

}