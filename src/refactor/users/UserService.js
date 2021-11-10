import getService from "../utils/ServiceFactory";
import { RestClient } from "../utils/RestClient";
import "../../components/projects/Models";
export class UserService {
    constructor() {
        this.client = getService(RestClient);
    }
    async getWorkspaceUsers(id) {
        const res = await this.client.get('workspaces/' + id + '/users');
        return res;
    }
}
//# sourceMappingURL=UserService.js.map