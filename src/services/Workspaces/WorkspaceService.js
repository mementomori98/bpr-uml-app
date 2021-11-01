import getService from "../Services";
import { RestClient } from "../utils/RestClient";
export class WorkspaceService {
    constructor() {
        this.client = getService(RestClient);
    }
    async create(request) {
        const res = await this.client.post('workspace', {
            workspaceName: request.name,
            creatorId: 'creator-id-placeholder'
        });
        // Todo return something relevant
        return res;
    }
    async join(request) {
        const res = await this.client.post('invitation/response', {
            invitationId: request.invitationId,
            response: request.accepted
        });
    }
}
//# sourceMappingURL=WorkspaceService.js.map