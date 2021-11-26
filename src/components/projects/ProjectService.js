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
    async getContent(projectId) {
        return {
            _id: projectId,
            name: 'Dummy Project',
            items: [
                { name: '', path: '/folder1/', type: 'folder' },
                { name: '', path: '/folder2/', type: 'folder' },
                { name: '', path: '/folder1/subfolder1/', type: 'folder' },
                { name: '', path: '/folder1/subfolder2/', type: 'folder' },
                { name: 'diagram1', path: '/', type: 'diagram', id: 'dummyId' },
                { name: 'diagram2', path: '/folder1/', type: 'diagram', id: 'dummyId' },
                { name: 'model1', path: '/folder1/subfolder1/', type: 'model', id: 'dummyId' },
                { name: 'model2', path: '/folder2/', type: 'model', id: 'dummyId' },
            ]
        };
        // return await this.client.get(`projects/${projectId}/content`);
    }
}
//# sourceMappingURL=ProjectService.js.map