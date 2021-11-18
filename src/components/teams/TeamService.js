import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
export class TeamService {
    constructor() {
        this.client = getService(RestClient);
    }
    async create(request) {
        return await this.client.post('teams', request);
    }
}
//# sourceMappingURL=TeamService.js.map