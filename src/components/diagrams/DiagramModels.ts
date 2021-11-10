import {Model} from "../utils/Model";

export class DiagramModel<T> extends Model<T> {
    public id: string;
    public type: string;
}

export class BoxModel extends DiagramModel<BoxModel>{
    public text: string;
}