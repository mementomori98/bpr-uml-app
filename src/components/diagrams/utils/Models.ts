import {Model} from "../../utils/Model";

export class Representation<TRepresentation, TModel> extends Model<TRepresentation> {
    public _id: string;
    public modelId: string;
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public model: TModel;
}

export class DiagramModel<T> extends Model<T> {
    public _id: string;
    public type: string;
}

export class CreateModelRequest<T> extends Model<T> {
    public x: number;
    public y: number;
    public w: number;
    public h: number;
}