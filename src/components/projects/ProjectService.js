import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
import "./Models";
import "../teams/Models";
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
    async renameProject(id, request) {
        return await this.client.put('projects/' + id, request);
    }
    async deleteProject(id) {
        return await this.client.delete('projects/' + id);
    }
    async manageProjectUsers(id, request) {
        return await this.client.put('projects/' + id + '/users', request);
    }
    async manageProjectTeams(id, request) {
        return await this.client.put('projects/' + id + '/teams', request);
    }
    async create(request) {
        return await this.client.post('projects', request);
    }
    async getContent(projectId) {
        return {
            _id: projectId,
            name: 'Dummy Project',
            items: [
                { name: '', path: '/folder1/', type: 'folder' },
                { name: '', path: '/folder2/', type: 'folder' },
                { name: '', path: '/folder1/subfolder1/', type: 'folder' },
                { name: '', path: '/folder1/subfolder2/', type: 'folder' },
                { name: 'diagram1', path: '/', type: 'diagram', id: '61a0d2fa28f1167d4bbb87de' },
                { name: 'diagram2', path: '/folder1/', type: 'diagram', id: '61a0d289cdfe942f939a1d7c' },
                { name: 'model1', path: '/folder1/subfolder1/', type: 'model', id: 'dummyId' },
                { name: 'model2', path: '/folder2/', type: 'model', id: 'dummyId' },
            ]
        };
        // return await this.client.get(`projects/${projectId}/content`);
    }
}
//# sourceMappingURL=ProjectService.js.map