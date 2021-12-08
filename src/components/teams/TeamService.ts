import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";
import type {CreateTeamRequest} from "./Models";
import type {AddTeamUsersRequest, RenameTeamRequest} from "./Models";

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

    public async renameTeam(id: string, request: RenameTeamRequest) {
        return await this.client.put('teams/' + id, request);
    }

    public async deleteTeam(id: string) {
        return await this.client.delete('teams/' + id);
    }
}