
import getService from "../Services";
import {RestClient} from "../utils/RestClient";
import {CreateProjectRequest} from "../projects/Models";

export class UserService {

    private readonly client = getService(RestClient);

    public async getWorkspaceUsers(id: string) {
        const res = await this.client.get('workspaces/' + id + '/users');
        return res;
    }
}