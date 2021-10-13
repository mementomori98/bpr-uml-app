import type {CreateWorkspaceRequest} from "./Models";
import getService from "../Services";
import {RestClient} from "../utils/RestClient";

export class WorkspaceService {

    private readonly client = getService(RestClient);

    public async create(request: CreateWorkspaceRequest) {
        const res = await this.client.post('workspace', {
            workspaceName: request.name,
            creatorId: 'creator-id-placeholder'
        });
        // Todo return something relevant
        return res;
    }

}