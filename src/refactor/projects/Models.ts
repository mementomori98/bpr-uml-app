import {Model} from "../utils/Model";

export class CreateProjectRequest extends Model<CreateProjectRequest> {
    public title: string;
    public workspaceId: string;
}