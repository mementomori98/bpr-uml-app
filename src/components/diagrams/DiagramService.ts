import type {CreateDiagramRequest} from "./Models";
import getService from "../utils/ServiceFactory";
import {RestClient} from "../utils/RestClient";

export class DiagramService {

    private client = getService(RestClient);

    public async create(request: CreateDiagramRequest) {
        return await this.client.post('diagrams', request);
    }

}