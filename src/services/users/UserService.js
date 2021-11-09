import getService from "../Services";
import { RestClient } from "../utils/RestClient";
import "../projects/Models";
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