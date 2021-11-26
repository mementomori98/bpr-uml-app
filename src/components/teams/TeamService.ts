
import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";
import type {CreateTeamRequest} from "./Models";
import {AddProjectUsersRequest} from "../projects/Models";
import {AddTeamUsersRequest} from "./Models";

export class TeamService {

    private readonly client = getService(RestClient);

    public async create(request: CreateTeamRequest){
        return await this.client.post('teams', request);
    }

    public async getWorkspaceTeams(id: string) {
        const res = await this.client.get('workspaces/' + id + '/teams');
        return res;
    }

    public async getTeam(id: string) {
        const res = await this.client.get('teams/' + id);
        return res;
    }

    public async manageTeamUsers(id: string, request: AddTeamUsersRequest) {
        return await this.client.put('teams/' + id + '/users', request);
    }

    public async getProjectTeams(id: string) {
        const res = await this.client.get('workspaces/' + id + '/teams');
        return res;
    }
}