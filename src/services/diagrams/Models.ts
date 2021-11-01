import {Model} from "../Model";

export class CreateDiagramRequest extends Model<CreateDiagramRequest> {
    public folderId: string;
    public name: string;
}