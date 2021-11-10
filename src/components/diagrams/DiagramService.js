import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
export class DiagramService {
    constructor() {
        this.client = getService(RestClient);
    }
    async create(request) {
        return await this.client.post('diagrams', request);
    }
}
//# sourceMappingURL=DiagramService.js.map