
import {CreateModelRequest, DiagramModel, Representation} from "../utils/Models";

export class BoxModel extends DiagramModel<BoxModel>{
    public text: string;
}

export class BoxRepresentation extends Representation<BoxRepresentation> {
    public text: string;
}

export class CreateBoxRequest extends CreateModelRequest<CreateBoxRequest> {
    public text: string;
}