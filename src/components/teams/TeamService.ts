
import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";
import type {CreateTeamRequest} from "./Models";

export class TeamService {

    private readonly client = getService(RestClient);

    public async create(request: CreateTeamRequest){
        return await this.client.post('teams', request);
    }
}