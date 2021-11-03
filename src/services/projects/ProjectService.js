import getService from "../Services";
import { RestClient } from "../utils/RestClient";
export class ProjectService {
    constructor() {
        this.client = getService(RestClient);
    }
    async create(request) {
        return await this.client.post('projects', request);
    }
}
//# sourceMappingURL=ProjectService.js.map