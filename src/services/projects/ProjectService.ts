import getService from "../Services";
import {RestClient} from "../utils/RestClient";
import type {CreateProjectRequest} from "./Models";

export class ProjectService {

    private client = getService(RestClient);

    public async create(request: CreateProjectRequest) {
        return await this.client.post('projects', request);
    }

}